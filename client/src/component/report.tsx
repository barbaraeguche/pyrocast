import { FireReport } from '../utils/types.ts';
import { CircleAlert, Flame, Clock, DollarSign, ChartNoAxesColumnIncreasing } from 'lucide-react';

export default function Report({ report }: {
	report: FireReport
}) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'decimal',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	};
	
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto border border-[#722f37]/25">
			<div className="border-b border-gray-200 pb-4 mb-6">
				<h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
					<CircleAlert className="text-rose-600" size={20} />
					Fire Incident Report
				</h2>
			</div>
			
			<div className="space-y-6">
				<div className="flex items-start gap-3">
					<Flame className="text-orange-500 mt-0.5" size={18} />
					<div>
						<p className="text-sm text-gray-500">Fires Addressed</p>
						<p className="text-lg font-medium text-gray-900">{report.fires_addressed}</p>
					</div>
				</div>
				
				<div className="flex items-start gap-3">
					<Clock className="text-amber-500 mt-0.5" size={18} />
					<div>
						<p className="text-sm text-gray-500">Fires Delayed</p>
						<p className="text-lg font-medium text-gray-900">{report.fires_delayed}</p>
					</div>
				</div>
				
				<div className="flex items-start gap-3">
					<DollarSign className="text-emerald-500 mt-0.5" size={18} />
					<div>
						<p className="text-sm text-gray-500">Operational Costs</p>
						<p className="text-lg font-medium text-gray-900">
							${formatCurrency(report.operational_costs)}
						</p>
					</div>
				</div>
				
				<div className="flex items-start gap-3">
					<DollarSign className="text-rose-500 mt-0.5" size={18} />
					<div>
						<p className="text-sm text-gray-500">Damage Costs</p>
						<p className="text-lg font-medium text-gray-900">
							${formatCurrency(report.damage_costs)}
						</p>
					</div>
				</div>
				
				<div className="flex items-start gap-3">
					<ChartNoAxesColumnIncreasing className="text-gray-500 mt-0.5" size={18} />
					<div>
						<p className="text-sm text-gray-500">Severity Report</p>
						<p className="text-lg font-medium flex items-center gap-4 mt-1">
              <span>
                <span className="text-rose-600 font-bold">High: </span>
                <span className="text-gray-900">{report.severity_report.high}</span>
              </span>
							<span>
                <span className="text-amber-500 font-bold">Medium: </span>
                <span className="text-gray-900">{report.severity_report.medium}</span>
              </span>
							<span>
                <span className="text-emerald-500 font-bold">Low: </span>
                <span className="text-gray-900">{report.severity_report.low}</span>
              </span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}