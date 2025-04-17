import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import PillCard from '../../components/UI/PillCard';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { ScrollView } from 'react-native'; 

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const PreviewImage = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const TotalResultText = styled.Text`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
`;

const SimilarPillScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params as { imageUri: string };

  const [loading, setLoading] = useState(true);
  const [pills, setPills] = useState<any[]>([]);

  useEffect(() => {
    const fetchSimilarPills = async () => {
      try {
        // 여기에 실제 API 호출 추가 예정
        // 예시 응답:
        const mockData = [
          { name: '타이레놀 500mg', category: '진통제 / 해열제', type: '일반' },
          { name: '게보린', category: '진통제', type: '일반' },
          { name: '판콜에이내복액', category: '감기약', type: '일반' },
          { name: '이브퀵', category: '두통약', type: '일반' },
          { name: '콜대원', category: '감기약', type: '일반' },
        ];

        // 실제라면: await axios.post('/api/similar-pills', { imageUri })
        setPills(mockData);
      } catch (error) {
        Alert.alert('불러오기 실패', '유사한 약품 정보를 가져오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarPills();
  }, [imageUri]);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>유사한 약품 결과</Title>
      </Header>

      {imageUri && <PreviewImage source={{ uri: imageUri }} resizeMode="cover" />}

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <>
          <TotalResultText>총 {pills.length}개의 결과</TotalResultText>
          {pills.map((pill, index) => (
            <PillCard
              key={index}
              name={pill.name}
              category={pill.category}
              type={pill.type}
              onPressDetail={() => {
                navigation.navigate('PillDetailScreen' as never);
              }}
            />
          ))}
        </>
      )}
    </ScrollView>
    < BottomTabBar />
    </Container>
  );
};

export default SimilarPillScreen;
