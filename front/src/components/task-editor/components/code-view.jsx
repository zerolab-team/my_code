import React from 'react';
import styled from 'styled-components';

import { CodeEditor } from '../../code-editor';

export const CodeView = ({ value, className, language, height, timeout }) => {
  return (
    <StyledCodeView className={className}>
      <CodeEditor language={language} value={value} height={height} timeout={timeout} isLoaded />
    </StyledCodeView>
  );
};

const StyledCodeView = styled.div`
  background-color: var(--editor-background-color);
`;
