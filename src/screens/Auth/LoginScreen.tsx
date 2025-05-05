import React from 'react';
import styled from 'styled-components/native';
import { Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* import {
  login as kakaoLogin,
  getAccessToken,
  isKakaoTalkLoginAvailable,
} from '@react-native-seoul/kakao-login'; */
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 0 32px;
`;

/*
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
*/ 

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  background-color: #007bff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 12px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const SkipText = styled.Text`
  font-size: 14px;
  color: #6b7280;
  margin-top: 32px;
  text-decoration: underline;
`;

const LoginScreen = () => {
  const navigation = useNavigation();

  const goToSignup = () => {
    navigation.navigate('SignupScreen' as never);
  };

  const goToLogin = () => {
    navigation.navigate('LoginFormScreen' as never); 
  };

  /* const handleKakaoLogin = async () => {
    console.error("로그인 시작");
    try {
      const isAvailable = await isKakaoTalkLoginAvailable();

      if (!isAvailable) {
        Alert.alert("카카오톡 앱이 설치되어 있어야 로그인할 수 있습니다.");
        return;
      }

      const result = await kakaoLogin();
      console.error('result:', result);
    } catch (e) {
      console.error('로그인 중 예외 발생', e);
      console.error('에러', JSON.stringify(e));
    }
    
    try {
      const token = await getAccessToken();
  
      console.error('카카오 로그인 성공:', token.accessToken);
      // console.error('카카오 로그인 결과:', result);
  
      // 토큰을 AsyncStorage에 저장하거나 서버에 전달
      await AsyncStorage.setItem('userToken', token.accessToken);
  
      navigation.navigate('HomeScreen' as never);
    } catch (e) {
      console.error('카카오 로그인 실패:', e);
      Alert.alert('로그인 실패', '카카오 로그인에 실패했습니다.');
    }
  };  
  */

  const handleSkip = () => {
    navigation.navigate('HomeScreen' as never);
  };

  return (
    <Container>
      <Logo width="500" height="200"/>

{/*
      <Subtitle>SNS 계정으로 간편하게 시작하세요</Subtitle>

        <KakaoButton onPress={handleKakaoLogin}>
        <Image
            source={require('../../assets/kakao.png')}
            style={{ width: 20, height: 20 }}
        />
        <KakaoText>카카오로 시작하기</KakaoText>
      </KakaoButton> 
*/}
      <Button onPress={goToSignup}>
        <ButtonText>회원가입하기</ButtonText>
      </Button>

      <Button onPress={goToLogin}>
        <ButtonText>로그인하기</ButtonText>
      </Button>

      <SkipText onPress={handleSkip}>로그인 없이 시작하기</SkipText>
    </Container>
  );
};

export default LoginScreen;
