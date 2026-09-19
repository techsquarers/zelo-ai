import { apiClient } from './client';

export const getTodayTasksApi = async () => {
  const response = await apiClient.get('/tasks/today');
  return response.data;
};

export const completeTaskApi = async (taskId, status = 'done') => {
  const response = await apiClient.post(`/tasks/${taskId}/complete`, { status });
  return response.data;
};
