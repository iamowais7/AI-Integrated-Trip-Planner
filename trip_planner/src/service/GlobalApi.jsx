import api from '@/api/client';

export const GetPlaceImage = (query) => api.get(`/images?q=${encodeURIComponent(query)}`);
