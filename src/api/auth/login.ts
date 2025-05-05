import api from '../axiosInstance'; 

export type LoginForm = {
  name: string;
  email: string;
};

export const login = async (data: LoginForm) => {
  const res = await api.post('/api/auth/medi-login', data);
  return res.data;
};
