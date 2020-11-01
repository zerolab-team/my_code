import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Menu, Upload } from 'react-feather';

import { queries } from '@/utils/styles';
import { menuToggled } from '@/models/aside-menu';
import { loggedOut } from '@/models/auth';
import { Logo } from '@/components/logo';

export const Header = ({ className }) => {
  const isMdSize = useMediaQuery({ query: queries.md });

  return (
    <StyledHeader className={className}>
      {!isMdSize ? (
        <button type="button" className="menu-btn" onClick={menuToggled}>
          <Menu strokeWidth="1.5px" width="24px" />
        </button>
      ) : null}

      <Logo />

      <div className="header-actions">
        <button type="button" className="logout" onClick={loggedOut}>
          <Upload strokeWidth="1.5px" width="24px" />
        </button>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  min-height: var(--header-height);
  background-color: var(--header-bg-color);
  border-bottom: 1px solid var(--header-border-color);
  padding: 4px 24px;
  display: flex;
  align-items: center;

  .menu-btn {
    margin-right: 24px;

    &:hover {
      transform: scale(1.1);
    }
  }

  .header-actions {
    margin-left: auto;
  }

  .logout {
    margin-left: 12px;

    svg {
      transform: rotate(90deg);
    }
  }
`;
