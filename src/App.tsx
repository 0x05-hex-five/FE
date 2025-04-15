import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import PillScreen from './screens/Pill/PillScreen';
import PillDetailScreen from "./screens/Pill/PillDetailScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import BasicInfoScreen from './screens/Profile/BasicInfoScreen';
import FavoritesScreen from './screens/Profile/FavoritesScreen';


// 👉 추가할 스크린들 (임시 컴포넌트라도 생성 필요)
import CameraScreen from './screens/CameraScreen';
import CombinationScreen from './screens/ComninationScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PillScreen" component={PillScreen} />
        <Stack.Screen name="PillDetailScreen" component={PillDetailScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />

        {/* ✅ 추가된 스크린들 */}
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="CombinationScreen" component={CombinationScreen} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
