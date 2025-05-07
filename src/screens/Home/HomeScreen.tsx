import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBox from '../../components/UI/SearchBox';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { getNotifications } from '../../api/notification';

const Container = styled.View`
  flex: 1;
  padding: 24px 16px;
  background-color: #fff;
`;

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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [alarmSettings, setAlarmSettings] = useState<{ id: number; name: string; time: string }[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const userId = await AsyncStorage.getItem('userId');
        const key = userId ? `recentSearches_${userId}` : 'recentSearches_guest';
        setIsLoggedIn(!!userId);

        const saved = await AsyncStorage.getItem(key);
        setRecentSearches(saved ? JSON.parse(saved) : []);

        if (userId) {
          try {
            const res = await getNotifications();
            setAlarmSettings(res.data);
          } catch (err) {
            console.error('알림 정보 조회 실패:', err);
          }
        } else {
          setAlarmSettings([]);
        }
      })();
    }, [])
  );

  const saveSearch = async (keyword: string) => {
    const userId = await AsyncStorage.getItem('userId');
    const key = userId ? `recentSearches_${userId}` : 'recentSearches_guest';

    const existing = await AsyncStorage.getItem(key);
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = [keyword, ...parsed.filter((k: string) => k !== keyword)].slice(0, 3);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
    setRecentSearches(updated);
  };

  const deleteSearch = async (keyword: string) => {
    const userId = await AsyncStorage.getItem('userId');
    const key = userId ? `recentSearches_${userId}` : 'recentSearches_guest';

    const existing = await AsyncStorage.getItem(key);
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = parsed.filter((k: string) => k !== keyword);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
    setRecentSearches(updated);
  };

  const featureButtons = [
    { title: '약 촬영', icon: 'camera-outline', screen: 'CameraScreen' },
    { title: '약 조합 확인', icon: 'flask-outline', screen: 'CombinationScreen' },
    { title: '내 정보', icon: 'person-outline', screen: 'ProfileScreen' },
    { title: '즐겨찾기', icon: 'star-outline', screen: 'FavoritesScreen' },
  ];

  const categories = ['소화제', '진통제', '항생제', '감기약'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Container>
          <SearchBox
            placeholder="의약품명을 입력하세요"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              if (search.trim()) {
                saveSearch(search.trim());
                navigation.navigate('PillScreen' as never, {
                  initialKeyword: search.trim(),
                } as never);
              }
            }}
          />

          <CategoryRow>
            {categories.map((cat, index) => (
              <CategoryButton
                key={index}
                onPress={() =>
                  navigation.navigate('KeywordPillScreen' as never, {
                    initialKeyword: cat,
                  } as never)
                }
              >
                <CategoryText>{cat}</CategoryText>
              </CategoryButton>
            ))}
          </CategoryRow>

          <FeatureButtonContainer>
            {featureButtons.map((btn, index) => (
              <FeatureButton
                key={index}
                onPress={async () => {
                  if (['ProfileScreen', 'FavoritesScreen'].includes(btn.screen)) {
                    const userId = await AsyncStorage.getItem('userId');
                    if (!userId) {
                      Alert.alert('로그인 필요', '로그인 후 이용 가능한 기능입니다.');
                      return;
                    }
                  }
                  navigation.navigate(btn.screen as never);
                }}
              >
                <Ionicons name={btn.icon} size={28} color="#3182ce" />
                <FeatureText>{btn.title}</FeatureText>
              </FeatureButton>
            ))}
          </FeatureButtonContainer>

          <Section>
            <SectionTitle>최근 검색 기록</SectionTitle>
            {recentSearches.length === 0 ? (
              <Card>
                <ListItem>최근 검색어가 없습니다.</ListItem>
              </Card>
            ) : (
              recentSearches.map((item, index) => (
                <Card
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <ListItem style={{ flex: 1 }} numberOfLines={1} ellipsizeMode="tail">{item}</ListItem>
                  <Ionicons
                    name="close"
                    size={20}
                    color="#9ca3af"
                    onPress={() => deleteSearch(item)}
                  />
                </Card>
              ))
            )}
          </Section>

          <Section>
            <SectionTitle>알림 설정</SectionTitle>
            {!isLoggedIn ? (
              <Card>
                <ListItem>로그인 후 이용 가능한 기능입니다.</ListItem>
              </Card>
            ) : alarmSettings.length === 0 ? (
              <Card>
                <ListItem>등록된 알림이 없습니다.</ListItem>
              </Card>
            ) : (
              alarmSettings.map((item) => (
                <Card key={item.id}>
                  <AlarmItem>
                    <AlarmLabel>{item.name}</AlarmLabel>
                    <AlarmTime>{item.time}</AlarmTime>
                  </AlarmItem>
                </Card>
              ))
            )}
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
    position: 'relative',
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 80,
  },
});

export default HomeScreen;
