import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import SearchBox from '../../components/UI/SearchBox';
import BottomTabBar from '../../components/UI/BottomTabBar';
import PillFilter from '../../components/UI/PillFilter';
import PillCard from '../../components/UI/PillCard';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { searchPills } from '../../api/pill';
import { saveSearchKeyword } from '../../utils/recentSearch';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 8px 12px;
`;

const Spacer = styled.View`
  height: 60px;
  background-color: transparent;
`;

type Pill = {
  id: number;
  name: string;
  type: string;
  className: string;
  image?: string | null;
};

const PillScreen = () => {
  const [filter, setFilter] = useState('전체');
  const [pills, setPills] = useState<Pill[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const onSelect = (route.params as any)?.onSelect;
  const initialKeyword = (route.params as any)?.initialKeyword || '';
  const [search, setSearch] = useState(initialKeyword);

  const typeParam =
  filter === '전체' ? 'ALL' :
  filter === '일반약' ? 'OTC' :
  filter === '처방약' ? 'ETC' :
  'ALL';

  useEffect(() => {
    const fetchPills = async () => {
      try {
        const result = await searchPills(search, typeParam);
        setPills(result);
      } catch (err) {
        console.error('의약품 검색 실패:', err);
      }
    };

    fetchPills();
  }, [search, filter]);

  return (
    <>
      <Container>
        <SearchBox 
          placeholder="의약품명을 입력하세요" 
          value={search} 
          onChangeText={setSearch} 
          onCameraPress={() => navigation.navigate('CameraScreen' as never)}
        />
        <PillFilter selected={filter} onSelect={setFilter} />

        <FlatList
          data={pills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PillCard
              id={item.id}
              name={item.name}
              className={item.className}
              type={item.type}
              image={item.image}
              onPressDetail={() => {
                if (onSelect) {
                  onSelect(item.name);
                  navigation.goBack();
                } else {
                  saveSearchKeyword(item.name);
                  navigation.navigate('PillDetailScreen', { id: item.id });
                }
              }}
            />
          )}
          ListEmptyComponent={
            <EmptyText>
              검색 결과가 없습니다.
            </EmptyText>
          }
        />
      </Container>
      <Spacer /> 
      <BottomTabBar />
    </>
  );
};

const EmptyText = styled.Text`
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
  color: #9ca3af;
`;

export default PillScreen;
