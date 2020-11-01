import React from 'react';
import styled from 'styled-components';

export const TextArea = ({ value, onChange, className }) => {
  return <StyledTextArea value={value} onChange={onChange} className={className} />;
};

const StyledTextArea = styled.textarea``;
