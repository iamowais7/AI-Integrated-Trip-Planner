import { create } from 'zustand';
import api from '../api/client';

const useTripStore = create((set) => ({
  trips: [],
  currentTrip: null,
  loading: false,

  fetchMyTrips: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/trips');
      set({ trips: res.data });
    } finally {
      set({ loading: false });
    }
  },

  fetchTripById: async (id) => {
    set({ loading: true });
    try {
      const res = await api.get(`/trips/${id}`);
      set({ currentTrip: res.data });
      return res.data;
    } finally {
      set({ loading: false });
    }
  },

  updateTrip: async (id, data) => {
    const res = await api.put(`/trips/${id}`, data);
    set((state) => ({
      currentTrip: res.data,
      trips: state.trips.map((t) => (t._id === id ? res.data : t)),
    }));
    return res.data;
  },

  deleteTrip: async (id) => {
    await api.delete(`/trips/${id}`);
    set((state) => ({ trips: state.trips.filter((t) => t._id !== id) }));
  },

  shareTrip: async (id) => {
    const res = await api.post(`/trips/${id}/share`);
    return res.data;
  },

  clearCurrentTrip: () => set({ currentTrip: null }),
}));

export default useTripStore;
