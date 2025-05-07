import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageKey = (userId: string | null) => {
  return userId ? `recentSearches_${userId}` : 'recentSearches_guest';
};

// 최근 검색어 가져오기
export const getSearchKeywords = async (userId: string | null): Promise<string[]> => {
  try {
    const key = getStorageKey(userId);
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// 최근 검색어 저장 (최대 3개 유지)
export const saveSearchKeyword = async (keyword: string, userId: string | null) => {
  try {
    const key = getStorageKey(userId);
    const existing = await AsyncStorage.getItem(key);
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = [keyword, ...parsed.filter((k: string) => k !== keyword)].slice(0, 3);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
  } catch (err) {
    console.error('최근 검색 저장 실패:', err);
  }
};

// 특정 검색어 제거
export const removeSearchKeyword = async (keyword: string, userId: string | null) => {
  try {
    const key = getStorageKey(userId);
    const existing = await AsyncStorage.getItem(key);
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = parsed.filter((k: string) => k !== keyword);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
  } catch (err) {
    console.error('검색 기록 삭제 실패:', err);
  }
};

export const clearGuestSearchKeywords = async () => {
  try {
    await AsyncStorage.removeItem('recentSearches_guest');
  } catch (err) {
    console.error('비로그인 검색 기록 초기화 실패:', err);
  }
};
