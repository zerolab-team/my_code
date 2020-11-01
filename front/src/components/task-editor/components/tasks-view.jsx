import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Sidebar } from 'react-feather';
import { useMediaQuery } from 'react-responsive';

import { TextEditor } from '../../text-editor';
import { queries } from '@/utils/styles';

export const TasksView = ({ className, minHeight, width }) => {
  const isLgSize = useMediaQuery({ query: queries.lg });

  const [isOpen, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!isOpen);

  const [isVisible, setVisible] = useState(true);
  const toggleVisible = () => setVisible(!isVisible);

  useEffect(() => {
    if (!isLgSize) {
      setOpen(false);
      setVisible(false);
    }
  }, [isLgSize]);

  const handleClick = () => {
    if (!isLgSize) {
      toggleVisible();
    } else {
      toggleOpen();
      toggleVisible();
    }
  };

  return (
    <StyledTasksView
      className={className}
      minHeight={minHeight}
      width={width}
      isOpen={isOpen}
      isMobile={!isLgSize}
    >
      <div className="toolbar">
        {isOpen ? <p>Описание задания</p> : null}

        <button type="button" onClick={handleClick}>
          <Sidebar strokeWidth="1.5px" width="20px" />
        </button>
      </div>

      {!isOpen ? <p>Описание задания</p> : null}

      {isVisible ? (
        <div className="text-editor">
          <TextEditor className="task" />
        </div>
      ) : null}
    </StyledTasksView>
  );
};

const StyledTasksView = styled.div`
  background-color: var(--editor-background-color);
  border-right: 1px solid var(--editor-border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: ${({ minHeight }) => (minHeight > 0 ? `${minHeight}px` : 'initial')};
  padding: 0 14px;

  > .toolbar {
    min-width: 44px;
    width: calc(100% + 28px);
    margin-left: -14px;
    padding: ${({ isOpen }) => (isOpen ? '0 14px' : 0)};
    border-bottom: 1px solid var(--editor-border-color);
    min-height: 46px;
    display: flex;
    align-items: center;
    justify-content: ${({ isOpen }) => (isOpen ? 'space-between' : 'center')};

    button:hover {
      transform: scale(1.1);
    }
  }

  > p {
    display: flex;
    align-items: center;
    writing-mode: vertical-rl;
    padding: 14px 0;
    line-height: 20px;
  }

  > .text-editor {
    height: calc(100% - 46px);

    > .task {
      width: ${({ width }) => width};
    }

    ${({ isMobile }) =>
      isMobile &&
      css`
        position: absolute;
        left: 59px;
        background-color: var(--editor-background-color);
        z-index: 2;
        height: 100%;
        padding-left: 14px;
        width: calc(100% - 59px);

        > .task {
          width: 100%;
        }
      `}
  }
`;
