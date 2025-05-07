import React, { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BottomTabBar from '../../components/UI/BottomTabBar';
import PillCard from '../../components/UI/PillCard';
import { getFavorites, deleteFavorite } from '../../api/favorite';
import { getPillDetail } from '../../api/pill';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 16px 12px 80px;
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

const EmptyText = styled.Text`
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
  color: #9ca3af;
`;

type FavoritePill = {
  medicineId: number;
  medicineName: string;
  image?: string;
  className?: string;
  type?: string;
};

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [pills, setPills] = useState<FavoritePill[]>([]);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      const rawFavorites = res.data.data || [];

      const detailedFavorites = await Promise.all(
        rawFavorites.map(async (item: { medicineId: number; medicineName: string }) => {
          try {
            const detail = await getPillDetail(item.medicineId);
            return {
              medicineId: item.medicineId,
              medicineName: item.medicineName,
              image: detail.image,
              className: detail.className,
              type: detail.type,
            };
          } catch (error) {
            console.warn('상세 정보 불러오기 실패:', item.medicineId);
            return {
              medicineId: item.medicineId,
              medicineName: item.medicineName,
              image: null,
              className: '',
              type: '',
            };
          }
        })
      );

      setPills(detailedFavorites);
    } catch (err) {
      console.error('즐겨찾기 목록 조회 실패:', err);
    }
  };

  const handleDelete = async (pillId: number) => {
    try {
      await deleteFavorite(pillId);
      fetchFavorites();
    } catch (err) {
      console.error('즐겨찾기 삭제 실패:', err);
      Alert.alert('오류', '삭제에 실패했어요.');
    }
  };

  // 화면에 다시 진입했을 때 최신화
  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#1f2937" />
          </BackButton>
          <Title>즐겨찾기한 약품</Title>
        </Header>

        <FlatList
          data={pills}
          keyExtractor={(item) => item.medicineId.toString()}
          renderItem={({ item }) => (
            <PillCard
              id={item.medicineId}
              name={item.medicineName}
              image={item.image ?? null}
              className={item.className ?? ''}
              type={item.type ?? ''}
              onPressDetail={() =>
                navigation.navigate('PillDetailScreen', { id: item.medicineId })
              }
              onPressDelete={() => handleDelete(item.medicineId)}
              showDeleteIcon
            />
          )}
          ListEmptyComponent={
            <EmptyText>즐겨찾기한 약품이 없습니다.</EmptyText>
          }
        />
      </Container>
      <BottomTabBar />
    </>
  );
};

export default FavoritesScreen;
