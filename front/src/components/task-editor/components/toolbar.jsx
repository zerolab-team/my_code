import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';

import { br } from '../../../utils/styles';

export const Toolbar = ({ className, title }) => {
  const [value, setValue] = useState('');

  return (
    <StyledToolbar className={className}>
      {title ? (
        <div className="title">
          <h3>{title}</h3>
        </div>
      ) : (
        <div className="title">
          <TextareaAutosize
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Введите заголовок задания"
          />
        </div>
      )}

      <div className="buttons">
        {Array(4)
          .fill('')
          .map((_, index) => (
            <button key={index} type="button" className="button" />
          ))}
      </div>
    </StyledToolbar>
  );
};

const StyledToolbar = styled.div`
  min-height: 52px;
  width: 100%;
  padding-left: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--editor-border-color);
  background-color: var(--editor-background-color);

  > .title {
    padding: 6px 14px 6px 0;
    min-height: inherit;
    display: flex;
    align-items: center;
    min-width: 220px;
    max-width: 240px;
    height: inherit;

    ${br.lg} {
      min-width: 300px;
      max-width: 320px;
    }

    h3 {
      font-size: 16px;
    }

    textarea {
      background-color: transparent;
      color: inherit;
      width: 100%;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    margin-left: auto;
    flex-wrap: wrap;
    padding: 3px 11px;
  }

  .button {
    width: 34px;
    height: 34px;
    background-color: var(--editor-border-color);
    border-radius: 6px;
    margin: 3px;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
