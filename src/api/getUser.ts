// src/api/user/getUser.ts
import api from '../api/axiosInstance';

export type UserInfo = {
    id: number;
    name: string;
    email: string;
    birth: string; 
    gender: 'MAN' | 'WOMAN';
    pregnant: boolean;
    alert: boolean;
};

export const getUser = async (id: string): Promise<UserInfo> => {
  const res = await api.get(`/api/users/${id}`);
  return res.data.data;
};
