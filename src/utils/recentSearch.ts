import AsyncStorage from '@react-native-async-storage/async-storage';

// 최근 검색어 불러오기
export const getSearchKeywords = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem('recentSearches');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveSearchKeyword = async (keyword: string) => {
    try {
      const existing = await AsyncStorage.getItem('recentSearches');
      const parsed = existing ? JSON.parse(existing) : [];
  
      const updated = [keyword, ...parsed.filter((k: string) => k !== keyword)].slice(0, 3);
  
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (err) {
      console.error('최근 검색 저장 실패:', err);
    }
  };
  
  export const removeSearchKeyword = async (keyword: string) => {
    try {
      const existing = await AsyncStorage.getItem('recentSearches');
      const parsed = existing ? JSON.parse(existing) : [];
  
      const updated = parsed.filter((k: string) => k !== keyword);
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (err) {
      console.error('검색 기록 삭제 실패:', err);
    }
  };
