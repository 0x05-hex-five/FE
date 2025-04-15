import React, { useState } from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../../components/UI/BottomTabBar';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 24px 16px;
  padding-bottom: 80px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const SettingItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;

const ItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.View`
  margin-right: 12px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #1f2937;
`;

const SwitchContainer = styled.View<{ active: boolean }>`
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background-color: ${({ active }) => (active ? '#3182ce' : '#d1d5db')};
  justify-content: center;
  padding: 2px;
`;

const SwitchThumb = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Circle = styled.View<{ active: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #ffffff;
  position: absolute;
  left: ${({ active }) => (active ? '18px' : '2px')};
  transition: left 0.2s;
`;

const SettingsScreen = () => {
  const [autoLogin, setAutoLogin] = useState(true);
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Title>설정</Title>
      </Header>

      <SettingItem onPress={() => navigation.navigate('PasswordScreen' as never)}>
        <ItemLeft>
          <IconWrapper>
            <Ionicons name="lock-closed-outline" size={20} color="#3182ce" />
          </IconWrapper>
          <Label>비밀번호 변경</Label>
        </ItemLeft>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </SettingItem>

      <SettingItem onPress={() => navigation.navigate('PrivacyScreen' as never)}>
        <ItemLeft>
          <IconWrapper>
            <Ionicons name="shield-checkmark-outline" size={20} color="#3182ce" />
          </IconWrapper>
          <Label>개인정보 보호</Label>
        </ItemLeft>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </SettingItem>

      <SettingItem activeOpacity={1} onPress={() => setAutoLogin(!autoLogin)}>
        <ItemLeft>
          <IconWrapper>
            <Ionicons name="sync-outline" size={20} color="#3182ce" />
          </IconWrapper>
          <Label>자동 로그인</Label>
        </ItemLeft>
        <SwitchContainer active={autoLogin}>
            <SwitchThumb onPress={() => setAutoLogin(!autoLogin)}>
                <Circle active={autoLogin} />
            </SwitchThumb>
        </SwitchContainer>
      </SettingItem>

      <BottomTabBar />
    </Container>
  );
};

export default SettingsScreen;
