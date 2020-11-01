import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Plus } from 'react-feather';

import { CreatorContent } from './creator-content';

export const Creator = ({ onClick, isButtonVisible }) => {
  const [isOpen, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!isOpen);

  return (
    <StyledCreator isOpen={isOpen} isButtonVisible={isButtonVisible}>
      {!isButtonVisible ? (
        <button type="button" className="button-add" onClick={toggleOpen}>
          {isOpen ? (
            <X strokeWidth="1.5px" width="16px" />
          ) : (
            <Plus strokeWidth="1.5px" width="18px" />
          )}
        </button>
      ) : null}

      {isButtonVisible || isOpen ? (
        <CreatorContent className="creator" onClick={onClick} type="block" />
      ) : null}
    </StyledCreator>
  );
};

const StyledCreator = styled.div`
  position: relative;
  margin-top: ${({ isOpen, isButtonVisible }) =>
    isButtonVisible ? '12px' : isOpen ? '12px' : '6px'};
  margin-bottom: ${({ isOpen }) => (isOpen ? '6px' : '14px')};
  box-shadow: 0 3px 11px -3px var(--editor-box-shadow-color);

  .creator {
    padding: ${({ isButtonVisible }) => (isButtonVisible ? '3px' : '10px 3px 3px')};
    border: 1px solid var(--editor-border-color);
    border-radius: 6px;
  }

  .button-add {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 28px;
    background-color: var(--editor-border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -21px;
    border: 2px solid var(--editor-background-color);
    /* box-shadow: 0 0 0 1px var(--editor-border-color); */
    box-shadow: 0 0 0 1px var(--editor-border-color), 0 4px 6px -3px var(--editor-box-shadow-color);

    &:hover {
      transform: translateX(-50%) scale(1.1);
    }
  }
`;
