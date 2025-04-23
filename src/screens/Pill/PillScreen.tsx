import React, { useState } from 'react';
import styled from 'styled-components/native';
import SearchBox from '../../components/UI/SearchBox';
import BottomTabBar from '../../components/UI/BottomTabBar';
import PillFilter from '../../components/UI/PillFilter';
import PillCard from '../../components/UI/PillCard';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
// import axios from 'axios'; 

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 24px 16px;
  padding-bottom: 80px; // 하단탭 가리지 않게
`;

const dummyPills = [
  { name: '타이레놀 500mg', category: '진통제 / 해열제', type: '일반' },
  { name: '게보린', category: '진통제', type: '일반' },
  { name: '판콜에이내복액', category: '감기약', type: '일반' },
];

const PillScreen = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('전체');
  const [pills, setPills] = useState(dummyPills);
  const navigation = useNavigation();
  const route = useRoute();
  const onSelect = (route.params as any)?.onSelect;

    // 실제 API 호출
  /*
  useEffect(() => {
    const fetchPills = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/medicines', {
          params: {
            name: search,
            type: filter === '전체' ? 'ALL' : 'OTC', // 필요 시 ETC 분기
          },
        });
        setPills(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (search) fetchPills();
  }, [search, filter]);
  */

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
        {pills.map((pill, index) => (
          <PillCard
            key={index}
            name={pill.name}
            category={pill.category}
            type={pill.type}
            onPressDetail={() => {
              if (onSelect) {
                onSelect(pill.name);         
                navigation.goBack();       
              } else {
                navigation.navigate('PillDetailScreen' as never);
              }
            }}
          />
        ))}
      </Container>
      <BottomTabBar />
    </>
  );
};

export default PillScreen;
