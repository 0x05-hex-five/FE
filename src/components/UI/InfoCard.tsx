import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
`;

const InfoCard = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <Card>
      <Title>{title}</Title>
      {children}
    </Card>
  );
};

export default InfoCard;
