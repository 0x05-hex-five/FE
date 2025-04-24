import React from 'react';
import styled from 'styled-components/native';
import { Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  login as kakaoLogin,
  getAccessToken,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 0 32px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #6b7280;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const KakaoButton = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  background-color: #FFE812;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 4px;
`;

const KakaoText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #191919;
  margin-left: 8px;
`;

const SkipText = styled.Text`
  font-size: 14px;
  color: #6b7280;
  margin-top: 32px;
  text-decoration: underline;
`;

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleKakaoLogin = async () => {
    try {
      console.log('카카오 로그인 시작');
      await kakaoLogin();

      const { accessToken } = await getAccessToken();
      console.log('Access Token:', accessToken);

      // ⚠️ 백엔드 API 열리면 여기 주소 수정!
      const response = await axios.post('http://3.37.55.31:8080/api/auth/kakao-login', {
        access_token: accessToken,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem('access_token', token.access_token);
      await AsyncStorage.setItem('refresh_token', token.refresh_token);

      console.log('로그인 성공:', user.name);
      navigation.navigate('HomeScreen' as never);
    } catch (err: any) {
      console.error('로그인 실패:', err);
      Alert.alert('로그인 실패', err.message || '카카오 로그인 중 오류가 발생했어요 😢');
    }
  };

  const handleSkip = () => {
    navigation.navigate('HomeScreen' as never);
  };

  return (
    <Container>
      <Logo width="500" height="200"/>

      <Subtitle>SNS 계정으로 간편하게 시작하세요</Subtitle>

      <KakaoButton onPress={handleKakaoLogin}>
        <Image
            source={require('../../assets/kakao.png')}
            style={{ width: 20, height: 20 }}
        />
        <KakaoText>카카오로 시작하기</KakaoText>
      </KakaoButton>

      <SkipText onPress={handleSkip}>로그인 없이 시작하기</SkipText>
    </Container>
  );
};

export default LoginScreen;
