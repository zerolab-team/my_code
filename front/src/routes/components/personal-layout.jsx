import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { useMediaQuery } from 'react-responsive';

import { Header } from '@/components/header';
import { Aside } from '@/components/aside';
import { br, queries } from '@/utils/styles';
import { $menu, menuToggled, menuOpened, menuClosed } from '@/models/aside-menu';

export const PersonalLayout = ({ children }) => {
  const isMenuOpen = useStore($menu);

  const isMdSize = useMediaQuery({ query: queries.md });

  useEffect(() => {
    if (isMdSize) menuOpened();
    else menuClosed();
  }, [isMdSize]);

  return (
    <StyledPersonalLayout>
      <Header />

      <main>
        {isMenuOpen ? (
          <Fragment>
            <div className="aside-wrapper">
              <Aside className="aside" />
            </div>

            {!isMdSize ? <div className="aside-backdrop" onClick={menuToggled} /> : null}
          </Fragment>
        ) : null}

        <div className="content-wrapper">{children}</div>
      </main>
    </StyledPersonalLayout>
  );
};

const StyledPersonalLayout = styled.div`
  main {
    display: flex;
  }

  .aside-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    max-width: 280px;

    ${br.md} {
      position: initial;
      min-width: 250px;
      max-width: initial;
      width: 250px;
    }
  }

  .aside-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: var(--backdrop-color);
    z-index: 1;
  }

  .aside {
    height: 100%;
  }

  .content-wrapper {
    margin-top: 32px;
    margin-bottom: 32px;
    width: 100%;

    ${br.md} {
      width: calc(100% - 250px);
    }
  }
`;
