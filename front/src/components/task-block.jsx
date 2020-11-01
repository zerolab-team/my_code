import React from 'react';
import styled from 'styled-components';

export const TaskBlock = ({ title, left, right, className, grid }) => {
  return (
    <StyledTaskBlock className={className} grid={grid}>
      <p className="task-title">{title}</p>

      <div className="task-actions">
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </StyledTaskBlock>
  );
};

const StyledTaskBlock = styled.div`
  min-width: 330px;
  width: 330px;
  height: 207px;
  border: 1px solid #d5d5dc;
  border-radius: 20px;
  overflow: hidden;

  .task-title {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    padding: 4px 18px;
    height: calc(100% - 60px);
  }

  .task-actions {
    border-top: 1px solid #d5d5dc;
    min-height: 60px;
    display: grid;
    grid-template-columns: ${({ grid }) => grid ?? 'repeat(2, 1fr)'};

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > div:first-of-type {
      border-right: 1px solid #d5d5dc;
    }

    > div:last-of-type {
      background-color: #2f80ed;
      color: var(--color-white);

      > button {
        color: inherit;
      }
    }
  }
`;
