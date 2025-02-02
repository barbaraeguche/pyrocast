import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Solution } from '../utils/types.ts';
import { defaultPrediction, defaultReport } from '../utils/constants.ts';
import Heading from './heading.tsx';
import FileUpload from './file-upload.tsx';
import Report from './report.tsx';
import Prediction from './prediction.tsx';
import MapVisual from './map-visual.tsx';

export default function Wildfire() {
	const [solutions, setSolutions] = useState<Solution>({
		'solution_1': defaultReport,
		'solution_2': defaultPrediction
	});
	
	const isLoaded = solutions.solution_1.operational_costs !== -1 && solutions.solution_2[0]._id !== -1;
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-gray-50/20 to-white">
			<motion.div className="p-8"
			            initial={false}
			            animate={{
										height: isLoaded ? "auto" : "100vh",
				            transition: { duration: 0.5, ease: "easeInOut" }
									}}
			>
				<motion.div animate={{
											y: isLoaded ? 0 : "35vh",
											transition: { delay: 0.1, duration: 0.5, ease: "easeInOut" }
										}}
										className="space-y-8"
				>
					<Heading/>
					{!isLoaded && <FileUpload setSolutions={setSolutions}/>}
				</motion.div>
				
				<AnimatePresence>
					{isLoaded && (
						<motion.div initial={{ opacity: 0, y: 20 }}
						            animate={{ opacity: 1, y: 0 }}
						            className="space-y-8 mt-8"
						            transition={{
													delay: 0.5,
													duration: 0.5,
							            ease: "easeOut"
												}}
						>
							<Report report={solutions.solution_1}/>
							<Prediction prediction={solutions.solution_2}/>
							<MapVisual prediction={solutions.solution_2}/>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}