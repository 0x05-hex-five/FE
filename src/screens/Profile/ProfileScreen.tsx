// src/screens/Profile/ProfileScreen.tsx

import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../../components/UI/BottomTabBar';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 24px 16px;
  padding-bottom: 80px;
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

const ProfileRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const Avatar = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #d1d5db;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const Info = styled.View``;

const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1f2937;
`;

const Email = styled.Text`
  font-size: 14px;
  color: #6b7280;
`;

const SubInfo = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const Card = styled.TouchableOpacity`
  background-color: #f9fafb;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CardIcon = styled.View`
  margin-right: 12px;
`;

const CardText = styled.View``;

const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #1f2937;
`;

const CardSub = styled.Text`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>내 정보</Title>
      </Header>

      <ProfileRow>
        <Avatar>
          <Ionicons name="person" size={32} color="#ffffff" />
        </Avatar>
        <Info>
          <Name>홍길동님</Name>
          <Email>example@email.com</Email>
          <SubInfo>여성 · 35세 · 임신 여부: 없음</SubInfo>
        </Info>
      </ProfileRow>

      <Card>
        <CardLeft>
          <CardIcon>
            <Ionicons name="information-circle-outline" size={20} color="#3182ce" />
          </CardIcon>
          <CardText>
            <CardTitle>기본 정보</CardTitle>
            <CardSub>여성 · 35세 · 임신 없음</CardSub>
          </CardText>
        </CardLeft>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </Card>

      <Card>
        <CardLeft>
          <CardIcon>
            <Ionicons name="bookmark-outline" size={20} color="#3182ce" />
          </CardIcon>
          <CardText>
            <CardTitle>즐겨찾기한 약품</CardTitle>
          </CardText>
        </CardLeft>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </Card>

      <Card>
        <CardLeft>
          <CardIcon>
            <Ionicons name="refresh-outline" size={20} color="#3182ce" />
          </CardIcon>
          <CardText>
            <CardTitle>복용 기록</CardTitle>
          </CardText>
        </CardLeft>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </Card>

      <Card>
        <CardLeft>
          <CardIcon>
            <Ionicons name="notifications-outline" size={20} color="#3182ce" />
          </CardIcon>
          <CardText>
            <CardTitle>알림 설정</CardTitle>
          </CardText>
        </CardLeft>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </Card>

      <BottomTabBar />
    </Container>
  );
};

export default ProfileScreen;
