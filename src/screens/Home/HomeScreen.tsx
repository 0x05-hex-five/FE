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
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  padding: 24px 16px;
  background-color: #fff;
`;

const ChoseongScroll = styled.ScrollView`
  margin-bottom: 12px;
`;

const ChoseongButton = styled.TouchableOpacity`
  background-color: #e5e7eb;
  padding: 6px 10px;
  border-radius: 12px;
  margin-right: 8px;
`;

const ChoseongText = styled.Text`
  font-size: 14px;
  color: #1f2937;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const CategoryButton = styled.TouchableOpacity`
  background-color: rgb(238, 240, 242);
  padding: 6px 14px;
  border-radius: 20px;
  margin: 4px 8px 4px 0;
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

const CHOSEONG_LIST = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const getChoseong = (char: string): string => {
  const CHOSEONG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const code = char.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return char;
  const index = Math.floor(code / 588);
  return CHOSEONG[index];
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [alarmSettings, setAlarmSettings] = useState<{ id: number; name: string; time: string }[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pillCategories, setPillCategories] = useState<string[]>([]);
  const [selectedChoseong, setSelectedChoseong] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(true);
  const [alarmLoading, setAlarmLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const res = await axios.get('http://3.37.55.31:8080/api/medicines', {
            params: { name: '', type: 'ALL' },
          });
          const allData = res.data.data || [];
          const uniqueClasses = [...new Set(
  allData.map((item: any) => item.className).filter((cls: unknown): cls is string => typeof cls === 'string')
)] as string[];
          setPillCategories(uniqueClasses);
        } catch (err) {
          console.error('카테고리 로딩 실패:', err);
        }

        const userId = await AsyncStorage.getItem('userId');
        const key = userId ? `recentSearches_${userId}` : 'recentSearches_guest';
        setIsLoggedIn(!!userId);

        const saved = await AsyncStorage.getItem(key);
        setRecentSearches(saved ? JSON.parse(saved) : []);
        setSearchLoading(false);

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
        setAlarmLoading(false);
      })();
    }, [])
  );

  const groupedByChoseong: Record<string, string[]> = pillCategories.reduce((acc, name) => {
    const cho = getChoseong(name[0]);
    if (!acc[cho]) acc[cho] = [];
    acc[cho].push(name);
    return acc;
  }, {} as Record<string, string[]>);

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

          <ChoseongScroll horizontal showsHorizontalScrollIndicator={false}>
            {CHOSEONG_LIST.map((cho) => (
              <ChoseongButton
                key={cho}
                onPress={() => setSelectedChoseong(cho === selectedChoseong ? null : cho)}
              >
                <ChoseongText>{cho}</ChoseongText>
              </ChoseongButton>
            ))}
          </ChoseongScroll>

          {selectedChoseong && (
            <>
              {groupedByChoseong[selectedChoseong] &&
              groupedByChoseong[selectedChoseong].length > 0 ? (
                <CategoryRow>
                  {groupedByChoseong[selectedChoseong].map((cat, index) => (
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
              ) : (
                <ListItem style={{ color: '#9ca3af', marginBottom: 12 }}>
                  해당 초성으로 시작하는 분류가 없습니다.
                </ListItem>
              )}
            </>
          )}

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
            {searchLoading ? (
              <Card><ListItem>불러오는 중...</ListItem></Card>
            ) : recentSearches.length === 0 ? (
              <Card><ListItem>최근 검색어가 없습니다.</ListItem></Card>
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
            {alarmLoading ? (
              <Card><ListItem>불러오는 중...</ListItem></Card>
            ) : !isLoggedIn ? (
              <Card><ListItem>로그인 후 이용 가능한 기능입니다.</ListItem></Card>
            ) : alarmSettings.length === 0 ? (
              <Card><ListItem>등록된 알림이 없습니다.</ListItem></Card>
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
