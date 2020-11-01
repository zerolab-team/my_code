import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { Sun, Moon } from 'react-feather';

import { Switcher } from '@/components/switcher';
import { $theme, themeChanged } from '@/models/theme';

export const ThemeSwitcher = ({ className }) => {
  const theme = useStore($theme);

  return (
    <StyledThemeSwitcher className={className}>
      <Sun strokeWidth="1.5px" width="20px" />

      <Switcher isActive={theme === 'dark'} onClick={themeChanged} className="switcher" />

      <Moon strokeWidth="1.5px" width="20px" />
    </StyledThemeSwitcher>
  );
};

const StyledThemeSwitcher = styled.div`
  display: flex;
  align-items: center;

  > .switcher {
    margin: 0 6px;
  }
`;
