import { create } from 'zustand';
import { getProgressSummaryApi } from '../api/progress';

export const useAppStore = create((set) => ({
  summary: null, // { streak, xp, today, has_roadmap, has_profile }
  isSummaryLoading: false,
  summaryError: null,

  fetchSummary: async () => {
    try {
      set({ isSummaryLoading: true, summaryError: null });
      const data = await getProgressSummaryApi();
      set({ summary: data, isSummaryLoading: false });
      return data;
    } catch (err) {
      set({ summaryError: err?.response?.data?.detail || 'Failed to fetch summary', isSummaryLoading: false });
      return null;
    }
  },

  setSummary: (summary) => set({ summary }),

  resetAppStore: () => set({ summary: null, isSummaryLoading: false, summaryError: null }),
}));
