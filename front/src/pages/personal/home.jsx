import React from 'react';
import styled from 'styled-components';

import { Container } from '@/components/container';
import { Meta } from '@/components/meta';

export const Home = () => {
  return (
    <StyledHome>
      <Meta name="home" />

      <Container>
        <p>Главная</p>
      </Container>
    </StyledHome>
  );
};

const StyledHome = styled.div``;
