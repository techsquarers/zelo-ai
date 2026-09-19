import { apiClient } from './client';

export const getProgressSummaryApi = async () => {
  const response = await apiClient.get('/progress/summary');
  return response.data;
};
