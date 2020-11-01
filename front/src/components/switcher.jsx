import React from 'react';
import styled from 'styled-components';

export const Switcher = ({
  isActive,
  onClick,
  backdropColor,
  backdropActiveColor,
  buttonColor,
  className,
}) => {
  return (
    <StyledSwitcher
      isActive={isActive}
      backdropColor={backdropColor}
      backdropActiveColor={backdropActiveColor}
      className={className}
      onClick={onClick}
      type="button"
    >
      <StyledSpin buttonColor={buttonColor} isActive={isActive} />
    </StyledSwitcher>
  );
};

const StyledSwitcher = styled.button`
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

const StyledSpin = styled.span`
  content: '';
  position: absolute;
  top: 2px;
  left: ${({ isActive }) => (isActive ? 'calc(100% - 2px)' : '2px')};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${({ buttonColor }) => buttonColor ?? 'var(--switcher-button-color)'};
  box-shadow: 0 0 2px 0 var(--switcher-button-shadow-color);
  transform: ${({ isActive }) => isActive && 'translateX(-100%)'};
`;
