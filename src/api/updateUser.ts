import api from '../api/axiosInstance';

export type UpdateUserData = {
  birth: string;
  gender: 'MAN' | 'WOMAN';
  pregnant: boolean;
  alert: boolean;
};

export const updateUser = async (id: string, data: UpdateUserData) => {
  const res = await api.patch(`/api/users/${id}`, data);
  return res.data;
};
