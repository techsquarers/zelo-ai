import { create } from 'zustand';
import { getMeApi } from '../api/auth';

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem('access_token') || null,
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,

  setAuth: (token, user = null) => {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
    set({ token, user, isAuthenticated: !!token, isLoading: false });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem('access_token');
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  initAuth: async () => {
    const token = get().token;
    if (!token) {
      set({ isAuthenticated: false, isLoading: false });
      return null;
    }
    try {
      set({ isLoading: true });
      const user = await getMeApi();
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (err) {
      get().logout();
      return null;
    }
  },
}));
