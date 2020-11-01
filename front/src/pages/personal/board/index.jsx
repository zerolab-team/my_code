import React from 'react';
import styled from 'styled-components';

import { ClassCollapser } from './components/class-collapser';
import { ClassCreator } from './components/class-creator';
import { Meta } from '@/components/meta';
import { Container } from '@/components/container';
import { PageTabs } from '@/components/page-tabs';

const tabs = [
  {
    text: 'Доска учеников',
    isActive: true,
    url: '/personal/board',
  },
  {
    text: 'Задания',
    isActive: false,
    url: '/personal/manage-tasks',
  },
];

export const Board = () => {
  return (
    <StyledBoard>
      <Meta name="board" />

      <Container>
        <PageTabs
          tabs={tabs}
          backdropColor="#1976d2"
          color="var(--color-white)"
          className="page-tabs"
        />

        <ClassCollapser name="7Б" size="21">
          <p className="stub">Талица</p>
        </ClassCollapser>

        <ClassCreator />
      </Container>
    </StyledBoard>
  );
};

const StyledBoard = styled.div`
  .page-tabs {
    margin-bottom: 40px;
  }

  .stub {
    padding: 24px 18px;
  }
`;
