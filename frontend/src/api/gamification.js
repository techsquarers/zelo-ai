import { apiClient } from './client';

export const getStreakApi = async () => {
  const response = await apiClient.get('/gamification/streak');
  return response.data;
};

export const getXpApi = async () => {
  const response = await apiClient.get('/gamification/xp');
  return response.data;
};

export const getGamificationDashboardApi = async () => {
  const response = await apiClient.get('/gamification/dashboard');
  return response.data;
};
