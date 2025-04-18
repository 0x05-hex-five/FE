import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface PillCardProps {
  name: string;
  category: string;
  type: string;
  onPressDetail: () => void;
  isSelected?: boolean; 
}

const Card = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? '#e0f2fe' : '#f9fbfc')};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
`;

const PillInfo = styled.View`
  flex: 1;
`;

const PillName = styled.Text`
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px;
`;

const PillMeta = styled.Text`
  font-size: 12px;
  color: #6b7280;
`;

const DetailLink = styled.Text`
  font-size: 12px;
  color: #3182ce;
  margin-top: 4px;
`;

const PillCard = ({
  name,
  category,
  type,
  onPressDetail,
  isSelected = false,
}: PillCardProps) => {
  const navigation = useNavigation();

  return (
    <Card
    activeOpacity={0.8}
    selected={isSelected}
    onPress={onPressDetail} 
    >
    <Ionicons
      name="image"
      size={40}
      color="#d1d5db"
      style={{ marginRight: 12 }}
    />
      <PillInfo>
        <PillName>{name}</PillName>
        <PillMeta>{category} / {type}</PillMeta>
        <DetailLink onPress={() => navigation.navigate('PillDetailScreen' as never)}>
  상세정보 보기 &gt;
</DetailLink>
      </PillInfo>
      <Ionicons name="bookmark-outline" size={20} color="#60a5fa" />
    </Card>
  );
};

export default PillCard;
