import React, { useState } from 'react';
import { Alert, ScrollView, Switch } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signup, SignupForm } from '../../api/auth/signup';

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

const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const GenderToggle = styled.TouchableOpacity<{ active: boolean }>`
  padding: 12px 24px;
  background-color: ${({ active }) => (active ? '#007bff' : '#eee')};
  border-radius: 8px;
`;

const GenderText = styled.Text<{ active: boolean }>`
  color: ${({ active }) => (active ? '#fff' : '#444')};
  font-weight: bold;
`;

const SubmitButton = styled.TouchableOpacity`
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

const SignupScreen = ({ navigation }: any) => {
  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    birth: '',
    gender: 'WOMAN',
    pregnant: false,
    alert: true,
  });

  const handleSignup = async () => {
    try {
      const res = await signup(form);    
      navigation.navigate('LoginFormScreen');
    } catch (err) {
      Alert.alert('회원가입 실패', '서버와 통신 중 문제가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <ScrollView>
      <Container>
        <Title>회원가입</Title>

        <Label>이름</Label>
        <Input
          placeholder="홍길동"
          placeholderTextColor="#999"
          onChangeText={(v: string) => setForm({ ...form, name: v })}
        />

        <Label>이메일</Label>
        <Input
          placeholder="email@example.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(v: string) => setForm({ ...form, email: v })}
        />

        <Label>생년월일</Label>
        <Input
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#999"
          onChangeText={(v: string) =>
            setForm({ ...form, birth: `${v}T00:00:00.000Z` })
          }
        />

        <Label>성별</Label>
        <Row>
          <GenderToggle
            active={form.gender === 'MAN'}
            onPress={() => setForm({ ...form, gender: 'MAN' })}
          >
            <GenderText active={form.gender === 'MAN'}>남성</GenderText>
          </GenderToggle>
          <GenderToggle
            active={form.gender === 'WOMAN'}
            onPress={() => setForm({ ...form, gender: 'WOMAN' })}
          >
            <GenderText active={form.gender === 'WOMAN'}>여성</GenderText>
          </GenderToggle>
        </Row>

        <Row>
          <Label>임신 여부</Label>
          <Switch
            value={form.pregnant}
            onValueChange={(v) => setForm({ ...form, pregnant: v })}
          />
        </Row>

        <Row>
          <Label>알림 수신 동의</Label>
          <Switch
            value={form.alert}
            onValueChange={(v) => setForm({ ...form, alert: v })}
          />
        </Row>

        <SubmitButton onPress={handleSignup}>
          <ButtonText>회원가입</ButtonText>
        </SubmitButton>
      </Container>
    </ScrollView>
  );
};

export default SignupScreen;
