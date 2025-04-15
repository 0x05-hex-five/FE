import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 24px 16px 80px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled(TouchableOpacity)`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #1f2937;
`;

const InfoText = styled.Text`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 18px;
`;

const Button = styled.TouchableOpacity`
  background-color: #3182ce;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [current, setCurrent] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>비밀번호 변경</Title>
      </Header>

      <Label>현재 비밀번호</Label>
      <Input
        placeholder="현재 비밀번호를 입력하세요"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={current}
        onChangeText={setCurrent}
      />

      <Label>새 비밀번호</Label>
      <Input
        placeholder="새 비밀번호를 입력하세요"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={newPw}
        onChangeText={setNewPw}
      />

      <Label>새 비밀번호 확인</Label>
      <Input
        placeholder="새 비밀번호를 다시 입력하세요"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={confirmPw}
        onChangeText={setConfirmPw}
      />

      <InfoText>
        * 영문, 숫자, 특수문자 조합 8~20자{'\n'}
        * 이전에 사용하지 않은 비밀번호
      </InfoText>

      <Button onPress={() => {/* 비밀번호 변경 로직 */}}>
        <ButtonText>비밀번호 변경</ButtonText>
      </Button>

      <BottomTabBar />
    </Container>
  );
};

export default ChangePasswordScreen;
