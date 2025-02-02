import { ModelPrediction } from '../utils/types.ts';
import { TriangleAlert } from 'lucide-react';

export default function Prediction({ prediction }: {
	prediction: ModelPrediction[]
}) {
	const formatDecimal = (value: number, decimals = 1) => {
		return Number(value).toFixed(decimals);
	};
	
	return (
		<div className="mx-auto max-w-[1600px] bg-white rounded-lg shadow-md border border-[#722f37]/25">
			<div className="p-4 bg-gray-200/80 border-b border-gray-200">
				<h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
					<TriangleAlert className="text-orange-500" />
					Fire Risk Assessment Data
				</h2>
			</div>
			
			<div className="overflow-x-auto">
				<table className="w-full min-w-[1000px]">
					<thead className="bg-gray-200/80">
						<tr className={'border border-slate-300'}>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Timestamp</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Temp (°C)</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Humidity (%)</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Wind (km/h)</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Precip (mm)</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Veg. Index</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Human Activity</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Location</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Risk</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{prediction.map((pred) => (
							<tr key={pred._id} className="hover:bg-gray-50">
								<td className="px-4 py-3 text-sm text-gray-900">{pred._id}</td>
								<td className="px-4 py-3 text-sm text-gray-900">{pred.timestamp}</td>
								<td className="px-4 py-3 text-sm text-gray-900">{formatDecimal(pred.temperature)}</td>
								<td className="px-4 py-3 text-sm text-gray-900">{pred.humidity}</td>
								<td className="px-4 py-3 text-sm text-gray-900">{pred.wind_speed}</td>
								<td className="px-4 py-3 text-sm text-gray-900">{formatDecimal(pred.precipitation)}</td>
								<td className="px-4 py-3 text-sm text-gray-900">{pred.vegetation_index}</td>
								<td className="px-4 py-3 text-sm text-gray-900">{pred.human_activity_index}</td>
								<td className="px-4 py-3 text-sm text-gray-900">
									{formatDecimal(pred.latitude, 4)}, {formatDecimal(pred.longitude, 4)}
								</td>
								<td className="px-4 py-3 text-sm text-gray-900">{pred.fire_risk}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}