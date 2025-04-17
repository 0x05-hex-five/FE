// KeywordPillScreen.tsx

import React, { useState } from 'react';
import styled from 'styled-components/native';
import SearchBox from '../../components/UI/SearchBox';
import BottomTabBar from '../../components/UI/BottomTabBar';
import PillFilter from '../../components/UI/PillFilter';
import PillCard from '../../components/UI/PillCard';
import { useNavigation } from '@react-navigation/native';

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

const KeywordPillScreen = ({ route }: any) => {
  const { initialKeyword = '' } = route.params || {};
  const [search, setSearch] = useState(initialKeyword);
  const [filter, setFilter] = useState('전체'); 
  const navigation = useNavigation();

  const dummyPills = [
    { name: '타이레놀 500mg', category: '진통제 / 해열제', type: '일반' },
    { name: '게보린', category: '진통제', type: '일반' },
    { name: '판콜에이내복액', category: '감기약', type: '일반' },
  ];

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

        <TotalResultText>총 {dummyPills.length}개의 검색결과</TotalResultText>

        {dummyPills.map((pill, index) => (
          <PillCard
            key={index}
            name={pill.name}
            category={pill.category}
            type={pill.type}
            onPressDetail={() => navigation.navigate('PillDetailScreen' as never)}
          />
        ))}
      </Container>
      <BottomTabBar />
    </>
  );
};

export default KeywordPillScreen;
