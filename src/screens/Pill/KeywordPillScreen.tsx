import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import SearchBox from '../../components/UI/SearchBox';
import BottomTabBar from '../../components/UI/BottomTabBar';
import PillFilter from '../../components/UI/PillFilter';
import PillCard from '../../components/UI/PillCard';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchPills } from '../../api/pill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveSearchKeyword } from '../../utils/recentSearch';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 24px 16px;
  padding-bottom: 80px;
`;

const TotalResultText = styled.Text`
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
`;

const Message = styled.Text`
  font-size: 14px;
  color: #9ca3af;
  margin-top: 24px;
  text-align: center;
`;

const PAGE_SIZE = 20;

const KeywordPillScreen = ({ route }: any) => {
  const { initialKeyword = '' } = route.params || {};
  const [search, setSearch] = useState(initialKeyword);
  const [filter, setFilter] = useState('전체'); // 전체, 일반약, 처방약
  const [allPills, setAllPills] = useState<any[]>([]);
  const [pillList, setPillList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  const typeParam =
    filter === '전체' ? 'ALL' :
    filter === '일반약' ? 'OTC' :
    filter === '처방약' ? 'ETC' :
    'ALL';

  useEffect(() => {
    loadInitialData();
  }, [initialKeyword, filter]);

  const loadInitialData = async () => {
    setLoading(true);
    setPage(1);

    try {
      const all = await searchPills('', typeParam);
      const filtered = all.filter((pill: any) =>
        pill.className?.includes(initialKeyword)
      );

      setAllPills(filtered);
      setPillList(filtered.slice(0, PAGE_SIZE));
      setHasMore(filtered.length > PAGE_SIZE);
    } catch (err) {
      console.error('의약품 검색 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    const nextData = allPills.slice(0, nextPage * PAGE_SIZE);

    setPillList(nextData);
    setPage(nextPage);
    setHasMore(nextData.length < allPills.length);
  };

  const handlePressDetail = async (item: any) => {
    const userId = await AsyncStorage.getItem('userId');
    await saveSearchKeyword(item.name, userId); // ✅ 최근 검색 기록 저장
    navigation.navigate('PillDetailScreen' as never, {
      pillId: item.id,
    } as never);
  };

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

        {loading ? (
          <Message>불러오는 중...</Message>
        ) : (
          <>
            {allPills.length > 0 && (
              <TotalResultText>총 {allPills.length}개의 검색 결과</TotalResultText>
            )}

            <FlatList
              data={pillList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <PillCard
                  id={item.id}
                  name={item.name}
                  className={item.className}
                  type={item.type}
                  image={item.image}
                  onPressDetail={() => handlePressDetail(item)} // ✅ 최근 검색 기록 저장 포함
                />
              )}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.4}
              ListFooterComponent={() =>
                hasMore ? <Message>불러오는 중...</Message> : null
              }
              ListEmptyComponent={
                <Message>해당 분류에 속한 의약품이 없습니다.</Message>
              }
            />
          </>
        )}
      </Container>
      <BottomTabBar />
    </>
  );
};

export default KeywordPillScreen;
