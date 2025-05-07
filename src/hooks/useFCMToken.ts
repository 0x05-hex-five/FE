import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import api from '../api/axiosInstance';

const useFCMToken = () => {
  useEffect(() => {
    const registerToken = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) return;

        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);

        await api.post('/api/fcm-token', { token: fcmToken }); // 서버로 전송
      } catch (error) {
        console.error('FCM 토큰 등록 실패:', error);
      }
    };

    registerToken();
  }, []);
};

export default useFCMToken;
