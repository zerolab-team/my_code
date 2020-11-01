import React from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';

import { CreatorContent } from './creator-content';

export const CreatorItem = ({ onCreateClick, onCloseClick, isFirst, index }) => {
  return (
    <StyledCreatorItem isFirst={isFirst}>
      <button type="button" className="button-add" onClick={onCloseClick}>
        <X strokeWidth="1.5px" width="16px" />
      </button>

      <CreatorContent className="creator" onClick={onCreateClick} index={index} type="block" />
    </StyledCreatorItem>
  );
};

const StyledCreatorItem = styled.div`
  position: relative;
  margin-top: 6px;
  padding: 12px 3px;
  padding: ${({ isFirst }) => (isFirst ? '19px 3px 12px' : '12px 3px')};
  border: 1px solid var(--editor-border-color);
  border-radius: 6px;
  margin-top: ${({ isFirst }) => (isFirst ? '20px' : '12px')};
  box-shadow: 0 3px 11px -3px var(--editor-box-shadow-color);

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
    top: ${({ isFirst }) => (isFirst ? '-14px' : '-21px')};
    border: 2px solid var(--editor-background-color);
    box-shadow: 0 0 0 1px var(--editor-border-color), 0 4px 6px -3px var(--editor-box-shadow-color);

    &:hover {
      transform: translateX(-50%) scale(1.1);
    }
  }
`;
