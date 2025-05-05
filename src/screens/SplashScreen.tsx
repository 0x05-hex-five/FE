import React from 'react';
import styled from 'styled-components/native';
import LogoSvg from '../assets/logo.svg'; 
import { ActivityIndicator } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const SplashScreen = () => {
  return (
    <Container>
      <LogoSvg width={200} height={200} />
      <ActivityIndicator
        size="large"
        color="#3182ce"
        style={{ marginTop: 30 }}
      />
    </Container>
  );
};

export default SplashScreen;
