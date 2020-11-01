import React from 'react';
import styled from 'styled-components';

export const FormSwitcher = ({
  name,
  register,
  backdropColor,
  backdropActiveColor,
  buttonColor,
  values,
  className,
}) => {
  const isActive = values[name];

  return (
    <StyledLabel
      isActive={isActive}
      backdropColor={backdropColor}
      backdropActiveColor={backdropActiveColor}
      className={className}
    >
      <StyledCheckbox type="checkbox" name={name} ref={register} />

      <StyledButton buttonColor={buttonColor} />
    </StyledLabel>
  );
};

const StyledButton = styled.span`
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${({ buttonColor }) => buttonColor ?? 'var(--switcher-button-color)'};
  box-shadow: 0 0 2px 0 var(--switcher-button-shadow-color);
`;

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 46px;
  height: 26px;
  border-radius: 46px;
  background: ${({ isActive, backdropActiveColor, backdropColor }) =>
    isActive
      ? backdropActiveColor ?? 'var(--switcher-active-backdrop-color)'
      : backdropColor ?? 'var(--switcher-backdrop-color)'};
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;

  &:checked + ${StyledButton} {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;
