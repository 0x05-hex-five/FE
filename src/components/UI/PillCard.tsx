import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, Text } from 'react-native';

interface PillCardProps {
  id: number;
  name: string;
  type: string;
  className: string;
  confidence?: number;
  image?: string | null;
  onPressDetail: () => void;
  onPressDelete?: () => void;
  showDeleteIcon?: boolean;
}

const Card = styled.TouchableOpacity`
  background-color: #f9fbfc;
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

const ConfidenceText = styled.Text`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
`;

const PillCard = ({
  name,
  className,
  type,
  image,
  confidence,
  onPressDetail,
  onPressDelete,
  showDeleteIcon,
}: PillCardProps) => {
  return (
    <Card activeOpacity={0.85} onPress={onPressDetail}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 40, height: 40, marginRight: 12, borderRadius: 6 }}
        />
      ) : (
        <Ionicons
          name="image"
          size={40}
          color="#d1d5db"
          style={{ marginRight: 12 }}
        />
      )}

      <PillInfo>
        <PillName>{name}</PillName>
        <PillMeta>{className} / {type}</PillMeta>
        {confidence !== undefined && (
          <ConfidenceText>정확도: {(confidence * 100).toFixed(1)}%</ConfidenceText>
        )}
      </PillInfo>

      {showDeleteIcon && onPressDelete ? (
        <Ionicons
          name="trash-outline"
          size={20}
          color="#ef4444"
          onPress={onPressDelete}
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#60a5fa" />
      )}
    </Card>
  );
};

export default PillCard;
