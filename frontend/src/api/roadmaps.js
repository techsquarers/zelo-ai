import { apiClient } from './client';

export const generateRoadmapApi = async (targetRole) => {
  const body = targetRole ? { target_role: targetRole } : {};
  const response = await apiClient.post('/roadmaps/generate', body);
  return response.data;
};

export const getCurrentRoadmapApi = async () => {
  const response = await apiClient.get('/roadmaps/current');
  return response.data;
};
