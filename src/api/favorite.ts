import api from './axiosInstance';

export const createFavorite = async (pillId: number) => {
  return api.post(`/api/favorites/${pillId}`);
};

export const getFavorites = async () => {
  return api.get('/api/favorites');
};

export const deleteFavorite = async (pillId: number) => {
  return api.delete(`/api/favorites/${pillId}`);
};
