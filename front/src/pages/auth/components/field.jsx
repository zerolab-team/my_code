import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const Field = forwardRef(({ className, name, type = 'text', placeholder }, ref) => {
  return (
    <StyledField
      className={`truncate ${className}`}
      ref={ref}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
});

const StyledField = styled.input`
  background-color: var(--auth-field-bg-color);
  border: 1px solid var(--auth-field-border-color);
  border-radius: 12px;
  padding: 0 18px;
  min-height: 42px;
  width: 100%;
  font-size: 17px;
`;
