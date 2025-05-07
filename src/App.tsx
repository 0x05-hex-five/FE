import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFCMToken from './hooks/useFCMToken';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform  } from 'react-native';
// Screens
import HomeScreen from './screens/Home/HomeScreen';
import PillScreen from './screens/Pill/PillScreen';
import PillDetailScreen from './screens/Pill/PillDetailScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import BasicInfoScreen from './screens/Profile/BasicInfoScreen';
import FavoritesScreen from './screens/Profile/FavoritesScreen';
import AlarmScreen from './screens/Profile/AlarmScreen';
import SettingsScreen from './screens/Setting/SettingsScreen';
import PasswordScreen from './screens/Setting/PasswordScreen';
import PrivacyScreen from './screens/Setting/PrivacyScreen';
import KeywordPillScreen from './screens/Pill/KeywordPillScreen';
import SimilarPillScreen from './screens/Pill/SimilarPillScreen';
import ResultScreen from './screens/Combination/ResultScreen';
import LoadingScreen from './screens/Combination/LoadingScreen';
import CameraScreen from './screens/CameraScreen';
import CombinationScreen from './screens/Combination/ComninationScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import LoginFormScreen from './screens/Auth/LoginFormScreen';
import SplashScreen from './screens/SplashScreen'; 

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useFCMToken();

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('알림 권한 거부됨');
        } else {
          console.log('알림 권한 허용됨');
        }
      }
    };
  
    requestNotificationPermission(); 
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('포그라운드 메시지 수신:', remoteMessage);
      Alert.alert(remoteMessage.notification?.title ?? '', remoteMessage.notification?.body ?? '');
    });
  
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        const autoLogin = await AsyncStorage.getItem('autoLogin');
        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        if (!userId) {
          await AsyncStorage.removeItem('recentSearches_guest');
        }

        if (autoLogin === 'true' && token) {
          setInitialRoute('HomeScreen');
        } else {
          setInitialRoute('LoginScreen');
        }
      } catch (err) {
        console.error('자동 로그인 체크 실패:', err);
        setInitialRoute('LoginScreen');
      }
    };

    checkAutoLogin();
  }, []);

  if (!initialRoute) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="LoginFormScreen" component={LoginFormScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PillScreen" component={PillScreen} />
        <Stack.Screen name="PillDetailScreen" component={PillDetailScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="CombinationScreen" component={CombinationScreen} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        <Stack.Screen name="AlarmScreen" component={AlarmScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
        <Stack.Screen name="KeywordPillScreen" component={KeywordPillScreen} />
        <Stack.Screen name="SimilarPillScreen" component={SimilarPillScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
