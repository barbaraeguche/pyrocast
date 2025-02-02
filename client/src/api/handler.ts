import { apiClient } from '../utils/axiosConfig.ts';
import { Solution } from '../utils/types';
import { defaultReport, defaultPrediction } from '../utils/constants';

export const getSolutions = async (files: File[]): Promise<Solution> => {
	try {
		const formData = new FormData();
		files.forEach(file => {
			formData.append('uploaded', file);
		});
		
		const data = Array.from(formData.getAll('uploaded'));
		const response = await apiClient.post<Solution>('/upload', data);
		
		return response.data;
	} catch (err) {
		console.error('Error fetching solutions:', err);
		return {
			solution_1: defaultReport,
			solution_2: defaultPrediction
		};
	}
};