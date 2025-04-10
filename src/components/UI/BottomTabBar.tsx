import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  position: absolute;   
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-top-width: 1px;
  border-top-color: #e5e7eb;
  background-color: #ffffff;
`;

const TabButton = styled.TouchableOpacity`
  align-items: center;
`;

const Label = styled.Text`
  font-size: 12px;
  color: #374151;
  margin-top: 4px;
`;

const BottomTabBar = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <TabButton onPress={() => navigation.navigate('HomeScreen' as never)}>
        <Ionicons name="home-outline" size={20} color="#3182ce" />
        <Label>홈</Label>
      </TabButton>

      <TabButton onPress={() => navigation.navigate('PillScreen' as never)}>
        <Ionicons name="medkit-outline" size={20} color="#9ca3af" />
        <Label>약품정보</Label>
      </TabButton>

      <TabButton onPress={() => navigation.navigate('ProfileScreen' as never)}>
        <Ionicons name="person-outline" size={20} color="#9ca3af" />
        <Label>내정보</Label>
      </TabButton>

      <TabButton onPress={() => navigation.navigate('SettingsScreen' as never)}>
        <Ionicons name="settings-outline" size={20} color="#9ca3af" />
        <Label>설정</Label>
      </TabButton>
    </Container>
  );
};

export default BottomTabBar;
