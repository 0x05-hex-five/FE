import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { login, LoginForm } from '../../api/auth/login';

const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`;

const Input = styled.TextInput`
  height: 48px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 0 16px;
  margin-bottom: 16px;
  color: #1f2937;
`;

const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const LoginFormScreen = () => {
  const [form, setForm] = useState<LoginForm>({ name: '', email: '' });
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const res = await login(form);
      const { access_token, refresh_token, user_id } = res.data.token;

      await AsyncStorage.setItem('userToken', access_token);
      await AsyncStorage.setItem('refreshToken', refresh_token);
      await AsyncStorage.setItem('userId', String(user_id)); 

      navigation.navigate('HomeScreen' as never);
    } catch (err) {
      Alert.alert('로그인 실패', '입력하신 정보가 정확한지 확인해주세요.');
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>로그인</Title>

      <Input
        placeholder="이름"
        placeholderTextColor="#999"
        value={form.name}
        onChangeText={(v: string) => setForm({ ...form, name: v })}
      />

      <Input
        placeholder="이메일"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(v: string) => setForm({ ...form, email: v })}
      />

      <Button onPress={handleLogin}>
        <ButtonText>로그인</ButtonText>
      </Button>
    </Container>
  );
};

export default LoginFormScreen;
