import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { queries } from '@/utils/styles';
import logo from '@/assets/icons/logo.svg';
import wideLogo from '@/assets/icons/wide-logo.svg';

export const Logo = ({ className }) => {
  const isMdSize = useMediaQuery({ query: queries.md });

  return (
    <StyledLogo className={className} to="/personal/tasks">
      {!isMdSize ? <img src={logo} alt="" /> : <img src={wideLogo} alt="" />}
    </StyledLogo>
  );
};

const StyledLogo = styled(Link)``;
