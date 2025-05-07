import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/axiosInstance';
import { PermissionsAndroid, Platform } from 'react-native';

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
        const userToken = await AsyncStorage.getItem('userToken');

        if (!userToken || !fcmToken) return;

        await api.post(
          '/api/users/fcm-token',
          { fcmToken },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('FCM 토큰 서버 등록 완료');
      } catch (error) {
        console.error('FCM 토큰 등록 실패:', error);
      }
    };

    registerToken();
  }, []);
};

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('알림 권한 거부됨');
    } else {
      console.log('알림 권한 허용됨');
    }
  }
};

export default useFCMToken;
