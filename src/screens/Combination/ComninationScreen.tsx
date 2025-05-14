// screens/CombinationScreen.tsx
import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
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
  padding: 8px;
`;

const PillImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const PillText = styled.Text`
  font-size: 14px;
  color: #1f2937;
  text-align: center;
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
  const [pill1, setPill1] = useState<{ id: number; name: string; image?: string | null } | null>(null);
  const [pill2, setPill2] = useState<{ id: number; name: string; image?: string | null } | null>(null);

  const handleSelectPill = (pillSetter: any, selected: any) => {
    navigation.navigate('PillScreen', {
      onSelect: (pill: { name: string; id: number; image?: string | null }) => pillSetter(pill),
      selected,
    });
  };

  const handleCheck = () => {
    if (!pill1 || !pill2) {
      Alert.alert('약품 선택', '두 개의 약품을 모두 선택해주세요.');
      return;
    }

    navigation.navigate('LoadingScreen');
    navigation.navigate('ResultScreen', {
      id1: pill1.id,
      id2: pill2.id,
    });
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
        <PillBox onPress={() => handleSelectPill(setPill1, pill1)}>
          {pill1 ? (
            <>
              {pill1.image ? (
                <PillImage source={{ uri: pill1.image }} />
              ) : null}
              <PillText>{pill1.name}</PillText>
            </>
          ) : (
            <>
              <Ionicons name="add" size={24} color="#6b7280" />
              <PillText>첫 번째 약품 선택</PillText>
            </>
          )}
        </PillBox>

        <PillBox onPress={() => handleSelectPill(setPill2, pill2)}>
          {pill2 ? (
            <>
              {pill2.image ? (
                <PillImage source={{ uri: pill2.image }} />
              ) : null}
              <PillText>{pill2.name}</PillText>
            </>
          ) : (
            <>
              <Ionicons name="add" size={24} color="#6b7280" />
              <PillText>두 번째 약품 선택</PillText>
            </>
          )}
        </PillBox>
      </Row>

      <CheckButton onPress={handleCheck}>
        <CheckButtonText>조합 확인하기</CheckButtonText>
      </CheckButton>

      <BottomTabBar />
    </Container>
  );
};

export default CombinationScreen;
