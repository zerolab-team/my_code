import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { X } from 'react-feather';

import { SiteNavigation } from './site-navigation';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { br, queries } from '@/utils/styles';
import { menuToggled } from '@/models/aside-menu';

export const Aside = ({ className }) => {
  const isMdSize = useMediaQuery({ query: queries.md });

  return (
    <StyledAside className={className}>
      {!isMdSize ? (
        <div className="aside-header">
          <button type="button" className="menu-btn" onClick={menuToggled}>
            <X strokeWidth="1.5px" width="24px" />
          </button>
        </div>
      ) : null}

      <div className="aside-content">
        <SiteNavigation />
      </div>

      <div className="aside-settings">
        <ThemeSwitcher className="theme-switcher" />
      </div>
    </StyledAside>
  );
};

const StyledAside = styled.aside`
  width: 100%;
  background-color: var(--aside-bg-color);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  max-width: 280px;

  ${br.md} {
    border-right: 1px solid var(--aside-border-color);
    position: initial;
  }

  .aside-content {
    min-height: calc(100vh - var(--header-height) - 50px);
    max-height: calc(100vh - var(--header-height) - 50px);
    overflow: auto;
    padding: 30px 16px;

    ${br.md} {
      padding: 40px 24px;
    }
  }

  .aside-header {
    padding: 4px 16px;
    display: flex;
    align-items: center;
    min-height: var(--header-height);
    border-bottom: 1px solid var(--header-border-color);
  }

  .aside-settings {
    margin-top: auto;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 16px;
    border-top: 1px solid var(--header-border-color);
  }

  .menu-btn {
    &:hover {
      transform: scale(1.1);
    }
  }
`;
