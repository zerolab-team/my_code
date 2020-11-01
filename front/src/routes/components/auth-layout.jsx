import React from 'react';
import styled from 'styled-components';

import { ThemeSwitcher } from '@/components/theme-switcher';

export const AuthLayout = ({ children }) => {
  return (
    <StyledAuthLayout>
      {children}

      <ThemeSwitcher className="theme-switcher" />
    </StyledAuthLayout>
  );
};

const StyledAuthLayout = styled.div`
  min-height: 100vh;
  padding: 60px 0 30px;
  display: flex;
  flex-direction: column;

  .theme-switcher {
    padding-top: 30px;
    margin: auto auto 0;
  }
`;
