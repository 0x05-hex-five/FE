
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: 24px 16px 100px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
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
  margin-top: 18px;
`;

const ValueText = styled.Text`
  font-size: 14px;
  color: #4b5563;
`;

const RadioGroup = styled.View`
  flex-direction: row;
  margin-top: 6px;
`;

const RadioOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const RadioCircle = styled.View<{ selected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border-width: 2px;
  border-color: #3182ce;
  margin-right: 6px;
  background-color: ${({ selected }) => (selected ? '#3182ce' : 'transparent')};
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin-top: 6px;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #3182ce;
  padding: 14px;
  border-radius: 10px;
  align-items: center;
  margin-top: 24px;
`;

const SaveText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

const BasicInfoScreen = () => {
  const navigation = useNavigation();

  const [gender, setGender] = useState<'여성' | '남성'>('여성');
  const [age, setAge] = useState('35');
  const [pregnant, setPregnant] = useState<'있음' | '없음'>('없음');

  const handleSave = () => {
    Alert.alert('저장됨', `성별: ${gender}, 나이: ${age}, 임신: ${pregnant}`);
    // 여기서 상태값을 서버로 보내도 되고 저장소에 저장해도 됨
  };

  return (
    <Container>
      <Content>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#1f2937" />
          </BackButton>
          <Title>기본 정보</Title>
        </Header>

        <Label>이름</Label>
        <ValueText>홍길동</ValueText>

        <Label>성별</Label>
        <RadioGroup>
          <RadioOption onPress={() => setGender('여성')}>
            <RadioCircle selected={gender === '여성'} />
            <ValueText>여성</ValueText>
          </RadioOption>
          <RadioOption onPress={() => setGender('남성')}>
            <RadioCircle selected={gender === '남성'} />
            <ValueText>남성</ValueText>
          </RadioOption>
        </RadioGroup>

        <Label>나이</Label>
        <Input value={age} onChangeText={setAge} keyboardType="number-pad" />

        <Label>임신 여부</Label>
        <RadioGroup>
          <RadioOption onPress={() => setPregnant('없음')}>
            <RadioCircle selected={pregnant === '없음'} />
            <ValueText>없음</ValueText>
          </RadioOption>
          <RadioOption onPress={() => setPregnant('있음')}>
            <RadioCircle selected={pregnant === '있음'} />
            <ValueText>있음</ValueText>
          </RadioOption>
        </RadioGroup>

        <SaveButton onPress={handleSave}>
          <SaveText>저장하기</SaveText>
        </SaveButton>
      </Content>

      <BottomTabBar />
    </Container>
  );
};

export default BasicInfoScreen;
