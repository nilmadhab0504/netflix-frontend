import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.BACKEND_URL||"http://localhost:3000",
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

export const fetchMovies = (page: number = 1, limit: number = 20) => 
  api.get('/movies', { params: { page, limit } });

export const fetchFavorites = () => api.get('/favorites');

export const addFavorite = (movieId: string) => api.post(`/favorites/${movieId}`);

export const removeFavorite = (movieId: string) => api.delete(`/favorites/${movieId}`);

export const toggleFavorite = async (movieId: string) => {
  try {
    await addFavorite(movieId);
    return { message: 'Added to favorites' };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      await removeFavorite(movieId);
      return { message: 'Removed from favorites' };
    }
    throw error;
  }
};

export default api;