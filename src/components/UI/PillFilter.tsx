import React from 'react';
import styled from 'styled-components/native';

interface PillFilterProps {
  selected: string;
  onSelect: (value: string) => void;
}

const FilterRow = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const FilterButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 6px 14px;
  border-radius: 16px;
  margin-right: 8px;
  background-color: ${({ active }) => (active ? '#3182ce' : '#e5e7eb')};
`;

const FilterText = styled.Text<{ active: boolean }>`
  color: ${({ active }) => (active ? '#ffffff' : '#374151')};
  font-size: 14px;
`;

const PillFilter = ({ selected, onSelect }: PillFilterProps) => {
  const options = ['전체', '처방약', '일반약'];

  return (
    <FilterRow>
      {options.map((option) => (
        <FilterButton
          key={option}
          active={selected === option}
          onPress={() => onSelect(option)}
        >
          <FilterText active={selected === option}>{option}</FilterText>
        </FilterButton>
      ))}
    </FilterRow>
  );
};

export default PillFilter;
