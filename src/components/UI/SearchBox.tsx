// src/components/UI/SearchBox.tsx

import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #1f2937;
`;

const IconButton = styled.TouchableOpacity`
  padding-left: 8px;
`;

interface SearchBoxProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onCameraPress?: () => void; // <- 카메라 버튼 눌렀을 때
}

const SearchBox = ({ placeholder, value, onChangeText, onCameraPress }: SearchBoxProps) => {
  return (
    <Container>
      <Ionicons name="search" size={18} color="#9ca3af" />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
      />
      {onCameraPress && (
        <IconButton onPress={onCameraPress}>
          <Ionicons name="camera-outline" size={20} color="#9ca3af" />
        </IconButton>
      )}
    </Container>
  );
};

export default SearchBox;
