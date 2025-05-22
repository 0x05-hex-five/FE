import React, { useEffect, useState } from 'react';
import {Alert } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { checkPillInteraction, searchPills } from '../../api/pill';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PillBox = styled.View`
  flex: 0.48;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  align-items: center;
`;

const PillName = styled.Text`
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px;
  text-align: center;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: #2563eb;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 24px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

const AlertBox = styled.View<{ danger?: boolean }>`
  background-color: ${({ danger }) => (danger ? '#fee2e2' : '#d1fae5')};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const AlertMessage = styled.Text<{ danger?: boolean }>`
  font-size: 14px;
  color: ${({ danger }) => (danger ? '#b91c1c' : '#065f46')};
`;

const StyledImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const CenterBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const DetailButton = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid #d1d5db;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 12px;
`;

const DetailButtonText = styled.Text`
  font-size: 14px;
  color: #1f2937;
  margin-left: 8px;
`;

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id1, id2 } = route.params as { id1: number; id2: number };

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchInteraction = async () => {
    try {
      const res = await checkPillInteraction(id1, id2);

      // 이미지 보완
      const [pills1, pills2] = await Promise.all([
        searchPills(res.itemName1),
        searchPills(res.itemName2),
      ]);

      const pill1 = pills1.find((p: any) => p.name === res.itemName1) || pills1[0];
      const pill2 = pills2.find((p: any) => p.name === res.itemName2) || pills2[0];

      setResult({
        ...res,
        itemImage1: pill1?.image || null,
        itemImage2: pill2?.image || null,
      });
    } catch (err) {
      console.error('병용금기 API 오류:', err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  fetchInteraction();
}, [id1, id2]);

  const goToPillDetailByName = async (name: string) => {
    try {
      const pills = await searchPills(name);
      const pill = pills.find((p: any) => p.name === name) || pills[0];
      if (pill?.id) {
        navigation.navigate('PillDetailScreen', { id: pill.id });
      } else {
        Alert.alert('오류', `${name}의 상세 정보를 찾을 수 없습니다.`);
      }
    } catch (err) {
      Alert.alert('오류', '약품 정보를 불러오는 데 실패했습니다.');
    }
  };

  const renderResult = () => {
    if (!result) {
      return (
        <AlertBox danger>
          <AlertMessage danger>조합 확인이 어렵습니다. 다시 시도해주세요.</AlertMessage>
        </AlertBox>
      );
    }

    if (result.prohibit === true) {
      return (
        <>
          <AlertBox danger>
            <AlertMessage danger>이 약들은 함께 복용하면 안 됩니다.</AlertMessage>
          </AlertBox>
          {result.prohibitContent && (
            <AlertBox danger>
              <AlertMessage danger>사유: {result.prohibitContent}</AlertMessage>
            </AlertBox>
          )}
        </>
      );
    }

    return (
      <AlertBox>
        <AlertMessage>이 약들은 함께 복용 가능합니다.</AlertMessage>
      </AlertBox>
    );
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#1f2937" />
          </BackButton>
          <Title>약품 조합 결과</Title>
        </Header>

        <CenterBox style={{ flex: 1 }}>
          <Ionicons name="hourglass-outline" size={32} color="#2563eb" />
          <PillName style={{ marginTop: 8 }}>불러오는 중...</PillName>
        </CenterBox>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>약품 조합 결과</Title>
      </Header>

      <Row>
<PillBox>
  {result?.itemImage1 ? (
    <StyledImage source={{ uri: result.itemImage1 }} />
  ) : (
    <Ionicons name="image" size={36} color="#9ca3af" style={{ marginBottom: 8 }} />
  )}
  <PillName>{result?.itemName1 || '약품 1'}</PillName>
</PillBox>

<PillBox>
  {result?.itemImage2 ? (
    <StyledImage source={{ uri: result.itemImage2 }} />
  ) : (
    <Ionicons name="image" size={36} color="#9ca3af" style={{ marginBottom: 8 }} />
  )}
  <PillName>{result?.itemName2 || '약품 2'}</PillName>
</PillBox>
      </Row>

      <PrimaryButton onPress={() => navigation.navigate('CombinationScreen')}>
        <ButtonText>다시 분석하기</ButtonText>
      </PrimaryButton>

      {!loading && renderResult()}

      {result && (
        <CenterBox>
          <DetailButton onPress={() => goToPillDetailByName(result.itemName1)}>
            <Ionicons name="information-circle-outline" size={16} color="#1f2937" />
            <DetailButtonText>{result.itemName1} 상세정보 보기</DetailButtonText>
          </DetailButton>

          <DetailButton onPress={() => goToPillDetailByName(result.itemName2)}>
            <Ionicons name="information-circle-outline" size={16} color="#1f2937" />
            <DetailButtonText>{result.itemName2} 상세정보 보기</DetailButtonText>
          </DetailButton>
        </CenterBox>
      )}

      <BottomTabBar />
    </Container>
  );
};

export default ResultScreen;
