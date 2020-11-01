import React, { Fragment, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useCollapse from 'react-collapsed';
import { ChevronDown, ChevronUp, UserPlus } from 'react-feather';

import { br } from '@/utils/styles';

export const ClassCollapser = ({ children, name, size }) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse();

  useEffect(() => {
    setExpanded(true);
  }, [setExpanded]);

  return (
    <StyledClassCollapser isExpanded={isExpanded}>
      <div className="collapser-header">
        <div className="collapser-info">
          <p>Класс {name}</p>
          <p>{size} человек</p>
        </div>

        <div className="collapser-actions">
          {isExpanded ? (
            <Fragment>
              <button type="button">Назначить задачу</button>

              <button type="button">
                <UserPlus strokeWidth="1.5px" width="24px" />
              </button>
            </Fragment>
          ) : null}

          <button type="button" className="collapser-toggler" {...getToggleProps()}>
            {isExpanded ? (
              <ChevronUp strokeWidth="1.5px" width="24px" />
            ) : (
              <ChevronDown strokeWidth="1.5px" width="24px" />
            )}
          </button>
        </div>
      </div>

      <div {...getCollapseProps()}>{children}</div>
    </StyledClassCollapser>
  );
};

const StyledClassCollapser = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  .collapser-header {
    padding: 4px 18px;
    min-height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${({ isExpanded }) =>
      isExpanded &&
      css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        ${br.lg} {
          flex-direction: initial;
          align-items: center;
          justify-content: space-between;
        }
      `}
  }

  .collapser-info {
    display: flex;
    align-items: center;
    padding: 4px 0;

    p {
      margin-right: 20px;

      &:first-of-type {
        font-weight: 500;
        font-size: 18px;
      }

      &:last-of-type {
        color: var(--color-set-8);
      }
    }
  }

  .collapser-actions {
    display: flex;
    align-items: center;
    padding: 4px 0;
    width: ${({ isExpanded }) => isExpanded && '100%'};

    ${br.lg} {
      width: initial;
    }

    button {
      &:nth-child(2) {
        margin-left: auto;
      }

      &:not(:last-of-type) {
        margin-right: 24px;
        color: #2f80ed;
      }
    }
  }
`;
