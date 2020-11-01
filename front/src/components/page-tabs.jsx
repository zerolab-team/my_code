import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageTabs = ({ tabs, color, backdropColor, className }) => {
  return (
    <StyledPageTabs color={color} backdropColor={backdropColor} className={className}>
      {tabs.map(({ text, isActive, url }) => (
        <StyledTab color={color} backdropColor={backdropColor} isActive={isActive} key={text}>
          <Link to={url}>{text.toUpperCase()}</Link>
        </StyledTab>
      ))}
    </StyledPageTabs>
  );
};

const StyledPageTabs = styled.ul`
  display: inline-flex;
  border: ${({ backdropColor }) => `1px solid ${backdropColor}`};
  border-radius: 4px;
`;

const StyledTab = styled.li`
  a {
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    background-color: ${({ backdropColor, isActive }) => isActive && backdropColor};
    color: ${({ color, isActive, backdropColor }) => (isActive ? color : backdropColor)};
    min-height: 36px;
  }
`;
