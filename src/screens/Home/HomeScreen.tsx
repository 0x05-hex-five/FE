// src/screens/Home/HomeScreen.tsx

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SearchBox from '../../components/UI/SearchBox';
import BottomTabBar from '../../components/UI/BottomTabBar';

// 메인 컨텐츠 영역
const Container = styled.View`
  flex: 1;
  padding: 24px 16px;
  background-color: #fff;
`;

// 스타일 요소들
const CategoryRow = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const CategoryButton = styled.TouchableOpacity`
  background-color: rgb(238, 240, 242);
  padding: 6px 14px;
  border-radius: 20px;
  margin-right: 8px;
`;

const CategoryText = styled.Text`
  font-size: 14px;
  color: #374151;
`;

const FeatureButtonContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FeatureButton = styled.TouchableOpacity`
  width: 48%;
  height: 100px;
  background-color: #f1f5f9;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const FeatureText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-top: 8px;
`;

const Section = styled.View`
  margin-top: 8px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 12px;
`;

const Card = styled.View`
  background-color: #f9fbfc;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 10px;
`;

const ListItem = styled.Text`
  font-size: 14px;
  color: #374151;
`;

const AlarmItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AlarmLabel = styled.Text`
  font-size: 14px;
  color: #374151;
`;

const AlarmTime = styled.Text`
  font-size: 14px;
  color: #9ca3af;
`;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const featureButtons = [
    { title: '약 촬영', icon: 'camera-outline', screen: 'CameraScreen' },
    { title: '약 조합 확인', icon: 'flask-outline', screen: 'CombinationScreen' },
    { title: '내 정보', icon: 'person-outline', screen: 'ProfileScreen' },
    { title: '즐겨찾기', icon: 'star-outline', screen: 'FavoritesScreen' },
  ];

  const categories = ['소화제', '진통제', '항생제', '감기약'];
  const recentSearches = ['타이레놀', '게보린'];
  const alarmSettings = [{ label: '혈압약', time: '매일 오전 8:00' }];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Container>
          <SearchBox
            placeholder="의약품명을 입력하세요"
            value={search}
            onChangeText={setSearch}
          />

          <CategoryRow>
            {categories.map((cat, index) => (
              <CategoryButton key={index}>
                <CategoryText>{cat}</CategoryText>
              </CategoryButton>
            ))}
          </CategoryRow>

          <FeatureButtonContainer>
            {featureButtons.map((btn, index) => (
              <FeatureButton
                key={index}
                onPress={() => navigation.navigate(btn.screen as never)}
              >
                <Ionicons name={btn.icon} size={28} color="#3182ce" />
                <FeatureText>{btn.title}</FeatureText>
              </FeatureButton>
            ))}
          </FeatureButtonContainer>

          <Section>
            <SectionTitle>최근 검색 기록</SectionTitle>
            {recentSearches.map((item, index) => (
              <Card key={index}>
                <ListItem>{item}</ListItem>
              </Card>
            ))}
          </Section>

          <Section>
            <SectionTitle>알림 설정</SectionTitle>
            {alarmSettings.map((item, index) => (
              <Card key={index}>
                <AlarmItem>
                  <AlarmLabel>{item.label}</AlarmLabel>
                  <AlarmTime>{item.time}</AlarmTime>
                </AlarmItem>
              </Card>
            ))}
          </Section>
        </Container>
      </ScrollView>

      <BottomTabBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // 하단 탭 고정 가능
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 80, // 하단 탭 영역 확보
  },
});

export default HomeScreen;
