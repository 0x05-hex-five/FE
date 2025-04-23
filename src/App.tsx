import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import PillScreen from './screens/Pill/PillScreen';
import PillDetailScreen from "./screens/Pill/PillDetailScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PillScreen" component={PillScreen} />
        <Stack.Screen name="PillDetailScreen" component={PillDetailScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />

        {/* ✅ 추가된 스크린들 */}
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
