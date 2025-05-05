import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../../api/getUser';
import { updateUser } from '../../api/updateUser';

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

  const [name, setName] = useState('');
  const [gender, setGender] = useState<'여성' | '남성'>('여성');
  const [birth, setBirth] = useState('2000-01-01');
  const [pregnant, setPregnant] = useState<'있음' | '없음'>('없음');
  const [alertAgree, setAlertAgree] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;

        const user = await getUser(userId);
        setName(user.name);
        setGender(user.gender === 'WOMAN' ? '여성' : '남성');
        setBirth(user.birth);
        setPregnant(user.pregnant ? '있음' : '없음');
        setAlertAgree(user.alert);
      } catch (err) {
        console.error('사용자 정보 불러오기 실패:', err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('오류', '사용자 정보를 찾을 수 없습니다.');
        return;
      }

      const payload = {
        gender: (gender === '여성' ? 'WOMAN' : 'MAN') as 'WOMAN' | 'MAN', 
        birth,
        pregnant: pregnant === '있음',
        alert: alertAgree,
      };

      await updateUser(userId, payload);
      Alert.alert('저장 완료', '기본 정보가 수정되었습니다.');
      navigation.goBack();
    } catch (error) {
      console.error('정보 수정 실패:', error);
      Alert.alert('저장 실패', '서버 오류가 발생했습니다.');
    }
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
        <ValueText>{name || '이름 없음'}</ValueText>

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

        <Label>생년월일</Label>
        <Input
          value={birth}
          onChangeText={setBirth}
          placeholder="YYYY-MM-DD"
          keyboardType="numbers-and-punctuation"
        />

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

        <Label>알림 수신 동의</Label>
        <RadioGroup>
          <Switch value={alertAgree} onValueChange={setAlertAgree} />
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
