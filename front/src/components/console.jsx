import React from 'react';
import styled from 'styled-components';

export const Console = ({ children, className, height }) => {
  return (
    <StyledConsole className={className} height={height}>
      {children}
    </StyledConsole>
  );
};

const StyledConsole = styled.div`
  padding: 16px 24px;
  background-color: var(--editor-background-color);
  height: ${({ height }) => height};
`;
