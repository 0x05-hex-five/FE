import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InfoCard from '../../components/UI/InfoCard';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: 24px 16px 100px; /* 하단 탭 공간 확보 */
`;

const HeaderBar = styled.View`
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

const PillHeader = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const PillImage = styled.View`
  width: 80px;
  height: 80px;
  background-color: #d1d5db;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

const PillInfo = styled.View`
  flex: 1;
  margin-left: 16px;
  justify-content: center;
`;

const PillName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const PillTags = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 6px;
`;

const Tag = styled.Text`
  font-size: 12px;
  padding: 2px 8px;
  background-color: #f1f5f9;
  border-radius: 10px;
  color: #4b5563;
  margin-right: 6px;
  margin-top: 4px;
`;

const PillDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Content>
        <HeaderBar>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#1f2937" />
          </BackButton>
          <Title>약 상세정보</Title>
        </HeaderBar>

        <PillHeader>
          <PillImage>
            <Ionicons name="image" size={30} color="#9ca3af" />
          </PillImage>
          <PillInfo>
            <PillName>타이레놀 500mg</PillName>
            <PillTags>진통제 · 해열제</PillTags>
            <TagContainer>
              <Tag>일반의약품</Tag>
            </TagContainer>
          </PillInfo>
        </PillHeader>

        <InfoCard title="주요 성분">
          <PillTags>아세트아미노펜 500mg</PillTags>
        </InfoCard>

        <InfoCard title="효능·효과">
          <PillTags>
            감기로 인한 발열 및 통증 (두통, 신경통, 근육통, 관절통, 치통 등)
          </PillTags>
        </InfoCard>

        <InfoCard title="용법·용량">
          <PillTags>성인 1회 1~2정, 1일 3~4회 필요시 복용</PillTags>
        </InfoCard>

        <InfoCard title="주의사항">
          <PillTags>
            - 알레르기 반응이 있는 경우 복용하지 마세요{'\n'}
            - 1일 최대 4000mg을 초과하지 마세요{'\n'}
            - 음주 시 간손상 주의
          </PillTags>
        </InfoCard>
      </Content>

      <BottomTabBar />
    </Container>
  );
};

export default PillDetailScreen;
