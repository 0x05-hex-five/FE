// screens/CombinationScreen.tsx

import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../../components/UI/BottomTabBar';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const PillBox = styled.TouchableOpacity`
  flex: 0.48;
  height: 100px;
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const PillText = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #4b5563;
`;

const CheckButton = styled.TouchableOpacity`
  background-color: #2563eb;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
`;

const CheckButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

const CombinationScreen = () => {
  const navigation = useNavigation();

  const [pill1, setPill1] = useState<string | null>(null);
  const [pill2, setPill2] = useState<string | null>(null);

  const handleSelectPill1 = () => {
    navigation.navigate('PillScreen', {
      onSelect: (name: string) => setPill1(name),
      selected: pill1,
    });
  };
  
  const handleSelectPill2 = () => {
    navigation.navigate('PillScreen', {
      onSelect: (name: string) => setPill2(name),
      selected: pill2,
    });
  };

  const handleCheck = () => {
    if (!pill1 || !pill2) {
      Alert.alert('약품 선택', '두 개의 약품을 모두 선택해주세요.');
      return;
    }
  
    navigation.navigate('LoadingScreen');

    setTimeout(() => {
      navigation.navigate('ResultScreen', {
        pill1: { name: pill1, ingredient: '성분예시1' },
        pill2: { name: pill2, ingredient: '성분예시2' },
      });
    }, 2000);
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>약품 조합 분석</Title>
      </Header>

      <Row>
        <PillBox onPress={handleSelectPill1}>
          <Ionicons name="add" size={24} color="#6b7280" />
          <PillText>{pill1 || '첫 번째 약품 선택'}</PillText>
        </PillBox>

        <PillBox onPress={handleSelectPill2}>
          <Ionicons name="add" size={24} color="#6b7280" />
          <PillText>{pill2 || '두 번째 약품 선택'}</PillText>
        </PillBox>
      </Row>

      <CheckButton onPress={handleCheck}>
        <CheckButtonText>약품을 선택해주세요</CheckButtonText>
      </CheckButton>

      <BottomTabBar />
    </Container>
  );
};

export default CombinationScreen;
