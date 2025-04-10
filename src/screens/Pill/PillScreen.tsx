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
  padding-bottom: 80px; // 하단탭 가리지 않게
`;

const PillScreen = () => {
  const [search, setSearch] = useState('');
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
        {dummyPills.map((pill, index) => (
          <PillCard
            key={index}
            name={pill.name}
            category={pill.category}
            type={pill.type}
            onPressDetail={() => {}}
          />
        ))}
      </Container>
      <BottomTabBar />
    </>
  );
};

export default PillScreen;
