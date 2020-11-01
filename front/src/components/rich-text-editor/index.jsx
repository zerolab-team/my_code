import React, { useEffect } from 'react';
import { Editor, EditorState } from 'draft-js';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';

export const RichTextEditor = ({ editorState, onChange }) => {
  useEffect(() => {
    onChange(() => EditorState.createEmpty());
  }, [onChange]);

  return (
    <StyledRichTextEditor>
      {editorState ? <Editor editorState={editorState} onChange={onChange} /> : null}
    </StyledRichTextEditor>
  );
};

const StyledRichTextEditor = styled.div`
  border: 1px solid var(--editor-border-color);
  border-radius: 8px;
`;
