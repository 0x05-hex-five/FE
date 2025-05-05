import api from '../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  try {
    await api.post('/api/auth/logout'); 
    
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('userId');

    return true;
  } catch (err) {
    console.error('로그아웃 실패:', err);
    throw err;
  }
};
