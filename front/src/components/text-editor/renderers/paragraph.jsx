import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';

export const Paragraph = ({ value, onChange }) => {
  return <StyledParagraph value={value} onChange={onChange} placeholder="Введите текст" />;
};

const StyledParagraph = styled(TextareaAutosize)`
  width: 100%;
  height: 50px;
  background-color: var(--editor-background-color);
  color: var(--base-text-color);

  ::-webkit-scrollbar {
    border-left: none;
  }
`;
