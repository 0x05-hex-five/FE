import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.svg';

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

  const handleKakaoLogin = () => {
    console.log('카카오 로그인 시작');
  };

  const handleSkip = () => {
    navigation.navigate('HomeScreen' as never);
  };

  return (
    <Container>
      <Logo width="500" height="200" fill="#2563eb"/>

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
