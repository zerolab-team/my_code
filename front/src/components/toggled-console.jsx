import React from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronUp, Terminal } from 'react-feather';

import { useCollapse, Toggler, Content } from '../hooks/use-collapse';
import { Console } from './console';

export const ToggledConsole = ({ value, className, height, isConsoleOpen = true }) => {
  const { isOpen, toggleOpen } = useCollapse(isConsoleOpen);

  return (
    <StyledToggledConsole className={className} isOpen={isOpen}>
      <Toggler onClick={toggleOpen} className="toggler">
        <div className="label">
          <Terminal strokeWidth="1.5px" width="18px" />

          <p>Консоль</p>
        </div>

        {isOpen ? (
          <ChevronUp strokeWidth="1.5px" width="20px" />
        ) : (
          <ChevronDown strokeWidth="1.5px" width="20px" />
        )}
      </Toggler>

      <Content isOpen={isOpen}>
        <Console height={height}>{value}</Console>
      </Content>
    </StyledToggledConsole>
  );
};

const StyledToggledConsole = styled.div`
  > .toggler {
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    border-bottom: ${({ isOpen }) =>
      isOpen ? '1px solid var(--editor-border-color)' : '1px solid transparent'};
    border-top: 1px solid var(--editor-border-color);
  }

  > .toggler .label {
    display: flex;
    align-items: center;

    p {
      margin-left: 8px;
    }
  }
`;
