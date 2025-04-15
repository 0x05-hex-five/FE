import React, { useState } from 'react';
import styled from 'styled-components/native';
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

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #4b5563;
  margin-bottom: 12px;
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
`;

const RowLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #1f2937;
  margin-left: 8px;
`;

const SwitchContainer = styled.TouchableOpacity<{ active: boolean }>`
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background-color: ${({ active }) => (active ? '#3182ce' : '#d1d5db')};
  justify-content: center;
  padding: 2px;
`;

const Circle = styled.View<{ active: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #ffffff;
  align-self: ${({ active }) => (active ? 'flex-end' : 'flex-start')};
`;

const PrivacySettingsScreen = () => {
  const navigation = useNavigation();
  const [personalAgree, setPersonalAgree] = useState(true);
  const [location, setLocation] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);
  const [cookies, setCookies] = useState(true);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>개인정보 보호</Title>
      </Header>

      <SectionTitle>개인정보 보호 설정</SectionTitle>

      <SettingRow>
        <RowLeft>
          <Ionicons name="lock-closed-outline" size={18} color="#3182ce" />
          <Label>개인정보 수집 동의</Label>
        </RowLeft>
        <SwitchContainer active={personalAgree} onPress={() => setPersonalAgree(!personalAgree)}>
          <Circle active={personalAgree} />
        </SwitchContainer>
      </SettingRow>

      <SettingRow>
        <RowLeft>
          <Ionicons name="location-outline" size={18} color="#3182ce" />
          <Label>위치정보 수집</Label>
        </RowLeft>
        <SwitchContainer active={location} onPress={() => setLocation(!location)}>
          <Circle active={location} />
        </SwitchContainer>
      </SettingRow>

      <SettingRow>
        <RowLeft>
          <Ionicons name="share-social-outline" size={18} color="#3182ce" />
          <Label>제3자 정보제공</Label>
        </RowLeft>
        <SwitchContainer active={thirdParty} onPress={() => setThirdParty(!thirdParty)}>
          <Circle active={thirdParty} />
        </SwitchContainer>
      </SettingRow>

      <SettingRow>
        <RowLeft>
          <Ionicons name="document-text-outline" size={18} color="#3182ce" />
          <Label>쿠키 사용</Label>
        </RowLeft>
        <SwitchContainer active={cookies} onPress={() => setCookies(!cookies)}>
          <Circle active={cookies} />
        </SwitchContainer>
      </SettingRow>

      <BottomTabBar />
    </Container>
  );
};

export default PrivacySettingsScreen;
