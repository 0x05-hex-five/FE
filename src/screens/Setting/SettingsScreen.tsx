import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../api/auth/logout';

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
`;

const SettingsScreen = () => {
  const [autoLogin, setAutoLogin] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAutoLogin = async () => {
      const saved = await AsyncStorage.getItem('autoLogin');
      setAutoLogin(saved === 'true');
    };
    loadAutoLogin();
  }, []);

  const toggleAutoLogin = async () => {
    const newValue = !autoLogin;
    setAutoLogin(newValue);
    await AsyncStorage.setItem('autoLogin', newValue.toString());
  };

  const handleLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            await AsyncStorage.multiRemove(['userToken', 'refreshToken', 'userId']);
            await AsyncStorage.setItem('autoLogin', 'false');

            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' as never }],
            });
          } catch (err) {
            Alert.alert('로그아웃 실패', '서버와의 통신에 실패했습니다.');
          }
        },
      },
    ]);
  };

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

      <SettingItem activeOpacity={1} onPress={toggleAutoLogin}>
        <ItemLeft>
          <IconWrapper>
            <Ionicons name="sync-outline" size={20} color="#3182ce" />
          </IconWrapper>
          <Label>자동 로그인</Label>
        </ItemLeft>
        <SwitchContainer active={autoLogin}>
          <SwitchThumb onPress={toggleAutoLogin}>
            <Circle active={autoLogin} />
          </SwitchThumb>
        </SwitchContainer>
      </SettingItem>

      <SettingItem onPress={handleLogout}>
        <ItemLeft>
          <IconWrapper>
            <Ionicons name="log-out-outline" size={20} color="#e53e3e" />
          </IconWrapper>
          <Label style={{ color: '#e53e3e' }}>로그아웃</Label>
        </ItemLeft>
      </SettingItem>

      <BottomTabBar />
    </Container>
  );
};

export default SettingsScreen;
