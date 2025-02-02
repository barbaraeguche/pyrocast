import os
import heapq
import pandas as pd
from enum import Enum
from dataclasses import dataclass
from typing import Optional, List
from datetime import timedelta, datetime


class Severity(Enum):
	# severity levels for fires, ordered by priority
	low = 'low'
	medium = 'medium'
	high = 'high'

@dataclass
class ResourceType:
	# represents a type of firefighting resource with its properties
	name: str
	deployment_time: timedelta
	cost: int
	total_available: int
	current_available: int = None
	
	def __post_init__(self):
		# initialize current available to match total if not specified
		if self.current_available is None:
			self.current_available = self.total_available


@dataclass
class WildfireReport:
	# represents a single wildfire incident and its response details
	timestamp: datetime
	fire_start_time: datetime
	location: tuple
	severity: Severity
	assigned_resource: Optional[ResourceType] = None
	response_time: Optional[datetime] = None


class WildfireResponseSystem:
	def __init__(self):
		# initialize resource types with their specifications
		self.resources = {
			"smoke_jumpers": ResourceType("Smoke Jumpers", timedelta(minutes=30), 5000, 5),
			"fire_engines": ResourceType("Fire Engines", timedelta(hours=1), 2000, 10),
			"helicopters": ResourceType("Helicopters", timedelta(minutes=45), 8000, 3),
			"tanker_planes": ResourceType("Tanker Planes", timedelta(hours=2), 15000, 2),
			"ground_crews": ResourceType("Ground Crews", timedelta(minutes=90), 3000, 8)
		}
		
		# track total resource capacity across all types
		self.total_units = sum(r.total_available for r in self.resources.values())
		self.units_in_use = 0
		
		# cost penalties for failing to respond to fires by severity
		self.damage_costs = {
			Severity.low: 50000,
			Severity.medium: 100000,
			Severity.high: 200000
		}
		
		# initialize tracking variables for system state
		self.fires: List[WildfireReport] = []
		self.operational_costs = 0
		self.damage_costs_total = 0
		self.missed_responses: List[WildfireReport] = []
		self.severity_counts = { Severity.low: 0, Severity.medium: 0, Severity.high: 0 }
	
	def load_data(self, filepath: str):
		# load and parse fire incident data from csv
		df = pd.read_csv(filepath)
		
		# extract latitude and longitude from location string
		df[['latitude', 'longitude']] = df['location'].str.split(',', expand=True)
		df['latitude'] = df['latitude'].astype(float)
		df['longitude'] = df['longitude'].astype(float)
		
		# create wildfire report objects from each row
		for _, row in df.iterrows():
			fire = WildfireReport(
				timestamp=pd.to_datetime(row['timestamp']),
				fire_start_time=pd.to_datetime(row['fire_start_time']),
				location=(row['latitude'], row['longitude']),
				severity=Severity(row['severity'])
			)
			self.fires.append(fire)
	
	def assign_resource(self, fire: WildfireReport) -> bool:
		# check if we've reached total resource capacity
		if self.units_in_use >= self.total_units:
			self.missed_responses.append(fire)
			self.damage_costs_total += self.damage_costs[fire.severity]
			return False
		
		# attempt to assign cheapest available resource
		for resource in sorted(self.resources.values(), key=lambda r: r.cost):
			if resource.current_available > 0:
				# update resource availability and costs
				resource.current_available -= 1
				self.units_in_use += 1
				
				# record assignment details
				fire.assigned_resource = resource
				fire.response_time = fire.timestamp
				self.operational_costs += resource.cost
				self.severity_counts[fire.severity] += 1
				return True
		
		# no resources were available
		self.missed_responses.append(fire)
		self.damage_costs_total += self.damage_costs[fire.severity]
		return False
	
	def process_fires(self):
		# process each fire in the loaded dataset
		for fire in self.fires:
			self.assign_resource(fire)
	
	def generate_report(self):
		# calculate summary statistics
		total_fires = len(self.fires)
		missed_fires = len(self.missed_responses)
		addressed_fires = total_fires - missed_fires
		
		# compile severity counts
		severity_report = {
			'low': self.severity_counts[Severity.low],
			'medium': self.severity_counts[Severity.medium],
			'high': self.severity_counts[Severity.high]
		}
		
		# return comprehensive report dictionary
		return {
			'fires_addressed': addressed_fires,
			'fires_delayed': missed_fires,
			'operational_costs': self.operational_costs,
			'damage_costs': self.damage_costs_total,
			'severity_report': severity_report
		}


def main() -> dict[str, int | dict[str, int | str]]:
	# create and run the wildfire response system
	system = WildfireResponseSystem()
	
	# get saved file
	current_wildfire_data = os.path.join(os.path.dirname(__file__), 'uploads', 'current_wildfiredata.csv')
	
	# load and process fire data from file
	system.load_data(current_wildfire_data)
	system.process_fires()
	
	# generate and display results
	report = system.generate_report()
	
	return {
		'fires_addressed': report['fires_addressed'],
		'fires_delayed': report['fires_delayed'],
		'operational_costs': report['operational_costs'],
		'damage_costs': report['damage_costs'],
		'severity_report': report['severity_report']
	}


if __name__ == "__main__":
	main()
	