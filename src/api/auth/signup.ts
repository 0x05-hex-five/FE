// src/api/auth/signup.ts
import axios from 'axios';

interface SignupData {
  name: string;
  email: string;
  birth: string; 
  gender: string;
  pregnant: boolean;
  alert: boolean;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    userInfo: {
      id: number;
      name: string;
      email: string;
    };
    token: {
      access_token: string;
      refresh_token: string;
      user_id: number;
    };
  };
}

export const signup = async (formData: SignupData): Promise<SignupResponse> => {
  const response = await axios.post<SignupResponse>(
    'http://3.37.55.31:8080/api/auth/signup',
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
