import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCollapse from 'react-collapsed';
import { ChevronDown, ChevronUp, File } from 'react-feather';

export const MultiCollapser = ({ children, title, count, actions, className }) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse(true);

  useEffect(() => {
    setExpanded(true);
  }, [setExpanded]);

  return (
    <StyledMultiCollapser className={className}>
      <div className="collapser-header">
        <button type="button" className="collapser-toggler" {...getToggleProps()}>
          {isExpanded ? (
            <ChevronUp strokeWidth="1.5px" width="24px" />
          ) : (
            <ChevronDown strokeWidth="1.5px" width="24px" />
          )}
        </button>

        <File strokeWidth="1.5px" width="24px" />

        <p className="collapser-title">{title}</p>

        <p className="collapser-count">({count})</p>

        <div className="collapser-line" />

        {actions ? <div className="collapser-actions">{actions}</div> : null}
      </div>

      <div {...getCollapseProps()}>
        <div className="collapser-content">{children}</div>
      </div>
    </StyledMultiCollapser>
  );
};

const StyledMultiCollapser = styled.div`
  .collapser-header {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-bottom: 30px;
  }

  .collapser-toggler {
    margin-right: 14px;
  }

  .collapser-title {
    margin-left: 14px;
    margin-right: 7px;
  }

  .collapser-count {
    margin-right: 12px;
  }

  .collapser-line {
    height: 2px;
    background-color: #d5d5dc;
    width: 100%;
  }

  .collapser-actions {
    margin-left: 12px;
  }

  .collapser-content {
    padding-bottom: 10px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      border-left: 0;
    }

    &::-webkit-scrollbar-track {
      background: #e0e0e0;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #828282;
      border-radius: 5px;
    }
  }
`;
