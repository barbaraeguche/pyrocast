import { FireReport, ModelPrediction } from './types.ts';

export const defaultReport: FireReport = {
	fires_addressed: -1,
	fires_delayed: -1,
	operational_costs: -1,
	damage_costs: -1,
	severity_report: { low: -1, medium: -1, high: -1 }
}

export const defaultPred: ModelPrediction = {
	_id: -1,
	timestamp: '',
	temperature: -1,
	humidity: -1,
	wind_speed: -1,
	precipitation: -1,
	vegetation_index: -1,
	human_activity_index: -1,
	latitude: -1,
	longitude: -1,
	fire_risk: -1
}

// Example with an array of default objects
export const defaultPrediction: ModelPrediction[] = Array.from({ length: 1 }, () => defaultPred);
