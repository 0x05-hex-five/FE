import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import PillCard from '../../components/UI/PillCard';
import BottomTabBar from '../../components/UI/BottomTabBar';
import axios from 'axios';

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
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'pill.jpg',
        type: 'image/jpeg',
      } as any);

      try {
        const response = await axios.post(
          'http://3.37.55.31:8080/api/ai/recognitions',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const result = response.data.data.map((item: any) => ({
          id: item.medicine.id,
          name: item.medicine.name,
          className: item.medicine.className,
          type: item.medicine.type,
          image: item.medicine.image,
          confidence: item.confidence,
        }));

        setPills(result);
      } catch (error) {
        console.error(error);
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
                id={pill.id}
                name={pill.name}
                className={pill.className}
                type={pill.type}
                image={pill.image}
                confidence={pill.confidence}
                onPressDetail={() => {
                  navigation.navigate('PillDetailScreen', { id: pill.id });
                }}
              />
            ))}
          </>
        )}
      </ScrollView>
      <BottomTabBar />
    </Container>
  );
};

export default SimilarPillScreen;
