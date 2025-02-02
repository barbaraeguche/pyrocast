export type FireReport = {
	fires_addressed: number
	fires_delayed: number
	operational_costs: number
	damage_costs: number
	severity_report: { low: number, medium: number, high: number }
}

export type ModelPrediction = {
	_id: number;
	timestamp: string;
	temperature: number;
	humidity: number;
	wind_speed: number;
	precipitation: number;
	vegetation_index: number;
	human_activity_index: number;
	latitude: number;
	longitude: number;
	fire_risk: number;
};

export type Solution = {
	solution_1: FireReport
	solution_2: ModelPrediction[]
}