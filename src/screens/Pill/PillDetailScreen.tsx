import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InfoCard from '../../components/UI/InfoCard';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: 24px 16px 100px;
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

const dummyDetail = {
  name: '어린이타이레놀산160밀리그램',
  className: '해열·진통·소염제',
  type: '일반의약품',
  efficacy: '감기로 인한 발열, 통증(두통, 치통, 근육통 등)',
  useMethod: '만 7~12세 1회 1정, 4~6시간 간격으로 복용',
  precaution: '과용 주의, 간질환자 복용 주의',
  sideEffect: '속쓰림, 어지럼증, 간기능 이상 등',
};

const PillDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = (route.params as { id?: number })?.id;
  const [pill, setPill] = useState(dummyDetail);

   /*
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/medicines/${id}`);
        setPill(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchDetail();
  }, [id]);
  */

  return (
    <Container>
      <Content>
        <HeaderBar>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#1f2937" />
          </BackButton>
          <Title>약 상세정보</Title>
        </HeaderBar>

        {pill ? (
          <>
            <PillHeader>
              <PillImage>
                <Ionicons name="image" size={30} color="#9ca3af" />
              </PillImage>
              <PillInfo>
                <PillName>{pill.name}</PillName>
                <PillTags>{pill.className}</PillTags>
                <TagContainer>
                  <Tag>{pill.type}</Tag>
                </TagContainer>
              </PillInfo>
            </PillHeader>

            <InfoCard title="효능·효과">
              <PillTags>{pill.efficacy}</PillTags>
            </InfoCard>

            <InfoCard title="용법·용량">
              <PillTags>{pill.useMethod}</PillTags>
            </InfoCard>

            <InfoCard title="주의사항">
              <PillTags>{pill.precaution}</PillTags>
            </InfoCard>

            <InfoCard title="부작용">
              <PillTags>{pill.sideEffect}</PillTags>
            </InfoCard>
          </>
        ) : (
          <PillTags>해당 약품의 정보를 찾을 수 없습니다.</PillTags>
        )}
      </Content>

      <BottomTabBar />
    </Container>
  );
};

export default PillDetailScreen;
