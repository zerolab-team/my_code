import React, { useEffect, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import { $theme } from '../models/theme';

const options = {
  minimap: {
    enabled: false,
  },
  folding: false,
  lineNumbersMinChars: 4,
  // renderLineHighlight: 'none',
  scrollBeyondLastLine: false,
  // automaticLayout: true,
  scrollbar: {
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  },
};

export const CodeEditor = ({
  language,
  value,
  onChange,
  height,
  width,
  maxWidth,
  timeout = '100',
  className,
  isLoaded,
  editorOptions,
}) => {
  const [isEditorShow, setEditorShow] = useState(false);
  const [isEditorLoaded, setEditorLoaded] = useState(false);

  const theme = useStore($theme);
  const currentTheme = theme === 'dark' ? 'custom-dark' : 'light';

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditorShow(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  useEffect(() => {
    if (isLoaded) {
      setEditorLoaded(isLoaded);
    }
  }, [isLoaded]);

  const handleEditorDidMount = (_, editor) => {
    // Pass callback to resize editor
    editor.onDidContentSizeChange(() => {
      editor.layout();
    });

    // Dirty hack to resize editor
    // setInterval(() => {
    //   editor.layout();
    // }, 100);
  };

  if (isEditorShow && isEditorLoaded) {
    return (
      <StyledMonacoEditor
        height={height}
        width={width}
        maxWidth={maxWidth}
        language={language}
        theme={currentTheme}
        value={value}
        options={{ ...options, ...editorOptions }}
        className={className}
        editorDidMount={handleEditorDidMount}
        onChange={onChange}
      />
    );
  }

  return <StyledStub>Загрузка...</StyledStub>;
};

const StyledMonacoEditor = styled(ControlledEditor)`
  overflow-y: hidden;
  overflow-x: hidden;
  max-width: ${({ maxWidth }) => maxWidth};
`;

const StyledStub = styled.div`
  padding: 16px;
  background-color: var(--editor-background-color);
`;
