import api from '../axiosInstance';

export type SignupForm = {
  name: string;
  email: string;
  birth: string;
  gender: 'MAN' | 'WOMAN';
  pregnant: boolean;
  alert: boolean;
};

export const signup = async (data: SignupForm) => {
  const res = await api.post('/api/auth/signup', data);
  return res.data;
};
