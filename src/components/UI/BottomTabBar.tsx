import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

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

const Label = styled.Text<{ active: boolean }>`
  font-size: 12px;
  margin-top: 4px;
  color: ${({ active }) => (active ? '#3182ce' : '#9ca3af')};
`;

const BottomTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const current = route.name;

  return (
    <Container>
      <TabButton onPress={() => navigation.navigate('HomeScreen' as never)}>
        <Ionicons
          name="home-outline"
          size={20}
          color={current === 'HomeScreen' ? '#3182ce' : '#9ca3af'}
        />
        <Label active={current === 'HomeScreen'}>홈</Label>
      </TabButton>

      <TabButton onPress={() => navigation.navigate('PillScreen' as never)}>
        <Ionicons
          name="medkit-outline"
          size={20}
          color={current === 'PillScreen' ? '#3182ce' : '#9ca3af'}
        />
        <Label active={current === 'PillScreen'}>약품정보</Label>
      </TabButton>

      <TabButton onPress={() => navigation.navigate('ProfileScreen' as never)}>
        <Ionicons
          name="person-outline"
          size={20}
          color={current === 'ProfileScreen' ? '#3182ce' : '#9ca3af'}
        />
        <Label active={current === 'ProfileScreen'}>내정보</Label>
      </TabButton>

      <TabButton onPress={() => navigation.navigate('SettingsScreen' as never)}>
        <Ionicons
          name="settings-outline"
          size={20}
          color={current === 'SettingsScreen' ? '#3182ce' : '#9ca3af'}
        />
        <Label active={current === 'SettingsScreen'}>설정</Label>
      </TabButton>
    </Container>
  );
};

export default BottomTabBar;
