import { create } from 'zustand';
import api from '../api/client';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),

  login: async (googleAccessToken) => {
    const res = await api.post('/auth/google', { access_token: googleAccessToken });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    set({ user, token, isLoggedIn: true });
    return user;
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isLoggedIn: false });
  },

  fetchMe: async () => {
    try {
      const res = await api.get('/auth/me');
      set({ user: res.data });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isLoggedIn: false });
    }
  },
}));

export default useAuthStore;
