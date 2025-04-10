import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import PillScreen from './screens/Pill/PillScreen';
import PillDetailScreen from "./screens/Pill/PillDetailScreen"

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PillScreen" component={PillScreen} />
        <Stack.Screen name="PillDetailScreen" component={PillDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
