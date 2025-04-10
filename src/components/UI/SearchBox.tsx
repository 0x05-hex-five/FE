// src/components/UI/SearchBox.tsx

import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 18px;
  background-color:rgb(240, 242, 246);
  border-radius: 10px;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #111827;
`;

const SearchBox = ({ placeholder = '의약품명을 입력하세요', value, onChangeText }: Props) => {
  return (
    <Container>
      <Ionicons name="search-outline" size={20} color="#6b7280" style={{ marginRight: 8 }} />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default SearchBox;
