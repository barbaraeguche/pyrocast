import React, { Dispatch, SetStateAction, useState } from 'react';
import { Upload } from 'lucide-react';
import { getSolutions } from '../api/handler.ts';
import { Solution } from '../utils/types.ts';

export default function FileUpload({ setSolutions }: {
	setSolutions: Dispatch<SetStateAction<Solution>>
}) {
	const [csvFiles, setCsvFiles] = useState<File[]>([]);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	
	const validFiles = [
		'current_wildfiredata.csv', 'historical_environmental_data.csv', 'historical_wildfiredata.csv', 'future_environmental_data.csv'
	];
	
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			const validCsvFiles = files.filter(file => validFiles.includes(file.name));
			setCsvFiles(prev => {
				const filesMap = new Map([...prev, ...validCsvFiles].map(file => [file.name, file]));
				return Array.from(filesMap.values());
			});
		}
	};
	
	const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		e.preventDefault(); // prevent form submission
		if (csvFiles.length !== validFiles.length) return;
		
		try {
			setIsUploading(true);
			const data = await getSolutions(csvFiles);
			setSolutions(data);
		} catch (error) {
			console.error('Error uploading files:', error);
			throw error;
		} finally {
			setIsUploading(false);
			setCsvFiles([]); // clear files after successful upload
		}
	};
	
	const handleClear = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault(); // prevent form submission
		setCsvFiles([]);
		// reset the file input
		const fileInput = document.getElementById('file-upload') as HTMLInputElement;
		if (fileInput) {
			fileInput.value = '';
		}
	};
	
	return (
		<form method={'post'} className={'w-full max-w-lg mx-auto'}>
			<label className={'sr-only'}>Upload CSV Files</label>
			
			<div className={'relative h-32 rounded-lg border-2 border-dashed border-[#722f37]/30'}>
				<input multiple
				       id={'file-upload'}
				       type={'file'}
				       accept={'.csv'}
				       className={'hidden'}
				       onChange={handleFileChange}
				/>
				
				<label htmlFor={'file-upload'}
				       className={'absolute inset-0 flex flex-col items-center justify-center cursor-pointer gap-y-3 hover:bg-[#722f37]/5 transition-colors'}
				>
					<Upload className={'size-6 text-[#722f37]'} />
					<p className={'text-sm font-medium text-gray-700'}>
						Click to upload files
					</p>
					<p className={'text-xs text-gray-500'}>
						CSV files only
					</p>
				</label>
			</div>
			
			{/* buttons */}
			<div className="mt-4 flex gap-2">
				<button type={'button'}
				        onClick={handleFileUpload}
				        disabled={csvFiles.length !== validFiles.length || isUploading}
				        className={'flex-1 px-4 py-2 rounded-md text-sm font-medium bg-[#722f37] text-white hover:bg-[#722f37]/80 cursor-pointer disabled:border disabled:border-[#722f37]/10 disabled:bg-[#722f37]/10 disabled:text-gray-800 disabled:cursor-not-allowed transition-colors duration-200'}
				>
					{isUploading ? 'Uploading...' : 'Upload Files'}
				</button>
				
				<button type={'button'}
				        onClick={handleClear}
				        disabled={csvFiles.length === 0 || isUploading}
				        className={`px-4 py-2 rounded-md text-sm font-medium border border-[#722f37]/10 disabled:cursor-not-allowed
				            ${csvFiles.length > 0
					        ? 'bg-gray-200/90 hover:bg-gray-200/70 text-[#722f37] cursor-pointer'
					        : 'bg-gray-100 text-gray-700 cursor-not-allowed'}
				            transition-colors duration-200`}
				>
					Clear
				</button>
			</div>
		</form>
	);
}