import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { useRoute } from '@react-navigation/native';

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
`;

const PillIngredient = styled.Text`
  font-size: 12px;
  color: #6b7280;
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

const AlertBox = styled.View`
  background-color: #fee2e2;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

const AlertIcon = styled(Ionicons).attrs({
  name: 'alert-circle',
  size: 20,
  color: '#b91c1c',
})`
  margin-right: 8px;
`;

const AlertMessage = styled.Text`
  font-size: 14px;
  color: #b91c1c;
`;

const CenterBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ExplainCard = styled.View`
  background-color: #f3f4f6;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`;

const ExplainTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 6px;
`;

const ExplainText = styled.Text`
  font-size: 13px;
  color: #4b5563;
  text-align: center;
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
  const { pill1, pill2 } = route.params as {
    pill1: { name: string; ingredient: string };
    pill2: { name: string; ingredient: string };
  };

  const resultText = '해당 약품은 함께 복용이 불가능합니다.';
  const explanation = '두 약품의 성분이 상호작용하여 부작용이 발생할 수 있으므로 함께 복용하지 마십시오.';

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>약품 조합 분석</Title>
      </Header>

      <Row>
        <PillBox>
          <Ionicons name="image" size={36} color="#9ca3af" style={{ marginBottom: 8 }} />
          <PillName>{pill1.name}</PillName>
          <PillIngredient>{pill1.ingredient}</PillIngredient>
        </PillBox>

        <PillBox>
          <Ionicons name="image" size={36} color="#9ca3af" style={{ marginBottom: 8 }} />
          <PillName>{pill2.name}</PillName>
          <PillIngredient>{pill2.ingredient}</PillIngredient>
        </PillBox>
      </Row>

      <PrimaryButton onPress={() => navigation.goBack()}>
        <ButtonText>다시 분석하기</ButtonText>
      </PrimaryButton>

      <AlertBox>
        <AlertIcon />
        <AlertMessage>분석 결과: {resultText}</AlertMessage>
      </AlertBox>

      <CenterBox>
        <ExplainCard>
          <ExplainTitle>상세 설명</ExplainTitle>
          <ExplainText>{explanation}</ExplainText>
        </ExplainCard>

        <DetailButton onPress={() => navigation.navigate('PillDetailScreen', { name: pill1.name })}>
          <Ionicons name="information-circle-outline" size={16} color="#1f2937" />
          <DetailButtonText>{pill1.name} 상세정보 보기</DetailButtonText>
        </DetailButton>

        <DetailButton onPress={() => navigation.navigate('PillDetailScreen', { name: pill2.name })}>
          <Ionicons name="information-circle-outline" size={16} color="#1f2937" />
          <DetailButtonText>{pill2.name} 상세정보 보기</DetailButtonText>
        </DetailButton>
      </CenterBox>

      <BottomTabBar />
    </Container>
  );
};

export default ResultScreen;
