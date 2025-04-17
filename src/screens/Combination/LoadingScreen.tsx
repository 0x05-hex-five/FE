import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const CenterBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  margin-top: 12px;
  font-size: 14px;
  color: #6b7280;
`;

const LoadingScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>약품 조합 분석</Title>
      </Header>

      <CenterBox>
        <ActivityIndicator size="large" color="#2563eb" />
        <LoadingText>분석중입니다...</LoadingText>
      </CenterBox>
    </Container>
  );
};

export default LoadingScreen;
