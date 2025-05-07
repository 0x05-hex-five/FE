import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import InfoCard from '../../components/UI/InfoCard';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { getFavorites, createFavorite, deleteFavorite } from '../../api/favorite';
import { getPillDetail } from '../../api/pill';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: 10px 12px;
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
  justify-content: space-between;
  align-items: center;
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

const Spacer = styled.View`
  height: 70px;
`;

const PillDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = (route.params as { id?: number })?.id;
  const [pill, setPill] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const data = await getPillDetail(id);
        setPill(data);

        const favRes = await getFavorites();
        const favIds = favRes.data.data.map((f: any) => f.medicineId);
        setIsFavorite(favIds.includes(data.id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetail();
  }, [id]);

  const toggleFavorite = async () => {
    if (!pill?.id) return;
    try {
      if (isFavorite) {
        await deleteFavorite(pill.id);
        setIsFavorite(false);
      } else {
        await createFavorite(pill.id);
        setIsFavorite(true);
      }
    } catch (err) {
      Alert.alert('오류', '즐겨찾기 처리 중 문제가 발생했습니다.');
    }
  };

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
                {pill.image ? (
                  <Image
                    source={{ uri: pill.image }}
                    style={{ width: 60, height: 60, borderRadius: 8 }}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons name="image" size={30} color="#9ca3af" />
                )}
              </PillImage>
              <PillInfo>
                <PillName>{pill.name}</PillName>
                <PillTags>{pill.className}</PillTags>
                <TagContainer>
                  <Tag>{pill.type}</Tag>
                </TagContainer>
              </PillInfo>
              <TouchableOpacity onPress={toggleFavorite} style={{ padding: 8 }}>
                <Ionicons
                  name={isFavorite ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color="#3182ce"
                />
              </TouchableOpacity>
            </PillHeader>

            <InfoCard title="효능·효과">
              <PillTags>{pill.efficacy}</PillTags>
            </InfoCard>
            <InfoCard title="용법·용량">
              <PillTags>{pill.useMethod}</PillTags>
            </InfoCard>
            {pill.storageMethod?.trim() && (
              <InfoCard title="보관방법">
                <PillTags>{pill.storageMethod}</PillTags>
              </InfoCard>
            )}
            {pill.precaution?.trim() && (
              <InfoCard title="주의사항">
                <PillTags>{pill.precaution}</PillTags>
              </InfoCard>
            )}
            {pill.sideEffect?.trim() && (
              <InfoCard title="부작용">
                <PillTags>{pill.sideEffect}</PillTags>
              </InfoCard>
            )}
            {pill.interaction?.trim() && (
              <InfoCard title="상호작용">
                <PillTags>{pill.interaction}</PillTags>
              </InfoCard>
            )}
          </>
        ) : (
          <PillTags>해당 약품 정보를 불러올 수 없습니다.</PillTags>
        )}
      </Content>
      <Spacer />
      <BottomTabBar />
    </Container>
  );
};

export default PillDetailScreen;
