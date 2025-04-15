import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../../components/UI/BottomTabBar';

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

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const PillCard = styled.View`
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

const PillName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1f2937;
`;

const PillCategory = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const IconWrapper = styled.View`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-10px);
`;

const FavoritesScreen = () => {
  const navigation = useNavigation();

  const pills = [
    { name: '타이레놀', category: '진통제' },
    { name: '게보린', category: '진통제' },
    { name: '부루펜', category: '해열제' },
    { name: '판콜에이내복액', category: '감기약' },
  ];

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>즐겨찾기한 약품</Title>
      </Header>

      {pills.map((pill, index) => (
        <PillCard key={index}>
          <PillName>{pill.name}</PillName>
          <PillCategory>{pill.category}</PillCategory>
          <IconWrapper>
            <Ionicons name="bookmark-outline" size={20} color="#60a5fa" />
          </IconWrapper>
        </PillCard>
      ))}

      <BottomTabBar />
    </Container>
  );
};

export default FavoritesScreen;
