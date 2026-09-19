import { apiClient } from './client';

export const onboardingApi = async (profileData) => {
  const response = await apiClient.post('/profile/onboarding', profileData);
  return response.data;
};

export const getProfileApi = async () => {
  const response = await apiClient.get('/profile');
  return response.data;
};

export const updateProfileApi = async (profileData) => {
  const response = await apiClient.put('/profile', profileData);
  return response.data;
};
