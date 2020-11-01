import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Field } from './field';

export const LabeledField = forwardRef(({ label, className, name, type, placeholder }, ref) => {
  return (
    <StyledLabeledField className={className}>
      <p className="label">{label}</p>

      <Field name={name} ref={ref} type={type} placeholder={placeholder} />
    </StyledLabeledField>
  );
});

const StyledLabeledField = styled.label`
  display: block;

  .label {
    margin-bottom: 4px;
  }
`;
