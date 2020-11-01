import React from 'react';
import styled from 'styled-components';
import { Trash2, ArrowDown, ArrowUp, Plus } from 'react-feather';

import { Paragraph } from '../renderers/paragraph';

export const BlockItem = ({
  onAddClick,
  onUpClick,
  onDownClick,
  onRemoveClick,
  isFirst,
  content,
  value,
  onChange,
  index,
}) => {
  return (
    <StyledBlockItem isFirst={isFirst}>
      <button type="button" onClick={onAddClick} className="button-add">
        <Plus strokeWidth="1.5px" width="18px" />
      </button>

      <div className="block-content">
        {content === 'paragraph' ? (
          <Paragraph
            value={value}
            onChange={(event) => onChange({ index, value: event.target.value })}
          />
        ) : null}
      </div>

      <div className="actions">
        <button type="button" onClick={onUpClick}>
          <ArrowUp strokeWidth="1.5px" width="16px" />
        </button>

        <button type="button" onClick={onDownClick}>
          <ArrowDown strokeWidth="1.5px" width="16px" />
        </button>

        <button type="button" onClick={onRemoveClick}>
          <Trash2 strokeWidth="1.5px" width="16px" color="var(--color-carnation)" />
        </button>
      </div>
    </StyledBlockItem>
  );
};

const StyledBlockItem = styled.div`
  position: relative;
  padding: 25px 6px 14px;
  border: 1px solid var(--editor-border-color);
  border-radius: 6px;
  margin-top: ${({ isFirst }) => (isFirst ? '20px' : '12px')};
  box-shadow: 0 3px 11px -3px var(--editor-box-shadow-color);

  > .block-content {
    display: flex;
    flex-direction: column;
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
    top: ${({ isFirst }) => (isFirst ? '-14px' : '-21px')};
    border: 2px solid var(--editor-background-color);
    box-shadow: 0 0 0 1px var(--editor-border-color), 0 4px 6px -3px var(--editor-box-shadow-color);

    &:hover {
      transform: translateX(-50%) scale(1.1);
    }
  }

  .actions {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--editor-border-color);
    background-color: var(--editor-background-color);
    border-radius: 6px;
    padding: 2px;
    top: -9px;
    right: -5px;
    box-shadow: 0 3px 7px -4px var(--editor-box-shadow-color);

    > button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22px;
      height: 22px;

      &:hover {
        transform: scale(1.1);
      }

      &:not(:last-of-type) {
        margin-right: 5px;
      }
    }
  }
`;
