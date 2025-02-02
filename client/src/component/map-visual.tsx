import { useState, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { ModelPrediction } from '../utils/types.ts';
import { Map as MapIcon } from 'lucide-react';

export default function MapVisual({ prediction }: {
	prediction: ModelPrediction[]
}) {
	const [open, setOpen] = useState<number>(0);
	const pointers = useMemo(() => {
		const pinColors = ['#E6B8AF', '#B4CFB0', '#D5B8E6', '#B8D5E6', '#E6D5B8', '#CFB0B4', '#B0B4CF', '#E6CFB0', '#B0CFB4', '#CFB4D5', '#B4D5CF']
		
		return prediction.map((pred, idx) => ({
			_id: pred._id,
			pinColor: pinColors[idx % pinColors.length],
			position: { lat: pred.latitude, lng: pred.longitude },
		}))
	}, [prediction]);
	
	return (
		<div className={'mx-auto max-w-[1600px]'}>
			<div className="border-b border-gray-200 pb-2 mb-2">
				<h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
					<MapIcon className="text-green-600" size={20} />
					Map Representing Each Coordinate in the Model Prediction Table
				</h2>
			</div>
			
			<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<div style={{ height: "750px" }}>
					<Map zoom={8.5}
					     center={{ lat: 45.0048, lng: -73.0300 }}
					     mapId="YOUR_MAP_ID" // add if time permits
					>
						{pointers.map((point) => (
							<AdvancedMarker key={point._id}
							                position={point.position}
							                onClick={() => setOpen(point._id)}
							>
								<Pin scale={1.2}
								     background={point.pinColor}
								     borderColor={'white'}
								     glyphColor={'#722f37'}
								/>
								
								{/* display information */}
								{open === point._id && (
									<InfoWindow position={point.position}
									            onCloseClick={() => setOpen(0)}
									            className={'w-24'}
									>
										<div className='flex flex-col gap-y-1 items-center'>
											<p><span className={'font-semibold'}>id: </span> {point._id}</p>
											<p><span className={'font-semibold'}>lat: </span> {point.position.lat}</p>
											<p><span className={'font-semibold'}>lng: </span> {point.position.lng}</p>
										</div>
									</InfoWindow>
								)}
							</AdvancedMarker>
						))}
					</Map>
				</div>
			</APIProvider>
		</div>
	);
}