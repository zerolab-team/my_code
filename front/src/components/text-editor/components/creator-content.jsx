import React from 'react';
import styled, { css } from 'styled-components';
import { Hash } from 'react-feather';

import { tooltips } from '../../tooltips';

const renderers = [
  {
    id: 'task-paragraph-button',
    content: 'paragraph',
    icon: <Hash strokeWidth="1.5px" width="16px" />,
  },
];

export const CreatorContent = ({ index, type, onClick, className, showText }) => {
  const handleClick = ({ content }) => {
    const item = { content, type, value: '' };

    if (index >= 0) return onClick({ index, item });

    return onClick(item);
  };

  return (
    <StyledCreatorContent className={className} showText={showText}>
      {renderers.map(({ id, content, icon }) => (
        <button
          key={id}
          data-tip
          data-for={id}
          type="button"
          onClick={() =>
            handleClick({
              content,
            })
          }
        >
          {icon}

          {showText ? <p>{tooltips.find(({ id: tooltipId }) => tooltipId === id).text}</p> : null}
        </button>
      ))}
    </StyledCreatorContent>
  );
};

const StyledCreatorContent = styled.div`
  display: flex;
  flex-wrap: wrap;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ showText }) => (showText ? 'initial' : '30px')};
    height: 30px;
    padding: ${({ showText }) => (showText ? '3px 6px' : '3px')};
    background-color: var(--editor-border-color);
    border-radius: 6px;
    margin: 3px;

    ${({ showText }) =>
      showText &&
      css`
        p {
          margin-left: 4px;
        }
      `}
  }
`;
