import React from 'react';
import styled from 'styled-components';

import { br } from '../utils/styles';

export const Container = ({ className, children, maxWidth = '1400px' }) => {
  return (
    <StyledContainer className={className} maxWidth={maxWidth}>
      <div className="content">{children}</div>
    </StyledContainer>
  );
};

const StyledContainer = styled.header`
  padding: 0 16px;

  ${br.md} {
    padding: 0 24px;
  }

  ${br.xl} {
    padding: 0 32px;
  }

  > .content {
    margin: 0 auto;
    max-width: ${({ maxWidth }) => maxWidth};
  }
`;
