import { apiClient } from './client';

export const loginApi = async (email, password) => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const response = await apiClient.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data; // { access_token, token_type }
};

export const registerApi = async (email, password) => {
  const response = await apiClient.post('/auth/register', { email, password });
  return response.data;
};

export const getMeApi = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
