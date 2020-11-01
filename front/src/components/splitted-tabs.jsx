import React, { Children } from 'react';
import styled, { css } from 'styled-components';

import { Tab, Panel } from '../hooks/use-tabs';

const getTabInfo = (tab, info) => info?.filter(({ name }) => name === tab)[0] || {};

export const SplittedTab = ({
  children,
  onClick,
  isActive,
  withIcon,
  contentColor,
  backdropColor,
  activeBackdropColor,
}) => {
  return (
    <StyledTab
      onClick={onClick}
      isActive={isActive}
      withIcon={withIcon}
      contentColor={contentColor}
      backdropColor={backdropColor}
      activeBackdropColor={activeBackdropColor}
    >
      {children}
    </StyledTab>
  );
};

const StyledTab = styled(Tab)`
  min-height: 26px;
  width: fit-content;
  padding: 0 10px;
  background-color: ${({ isActive, backdropColor }) =>
    isActive ? `${backdropColor || 'var(--editor-border-color)'}` : 'transparent'};
  color: ${({ isActive, contentColor }) => (isActive ? contentColor : 'inherit')};

  ${({ withIcon }) =>
    withIcon &&
    css`
      display: flex;
      align-items: center;

      > p {
        margin-left: 6px;
      }
    `}

  &:hover {
    cursor: pointer;
  }

  &:not(:last-of-type) {
    border-right: ${({ activeBackdropColor }) =>
      activeBackdropColor
        ? `1px solid  ${activeBackdropColor}`
        : '1px solid var(--editor-border-color)'};
  }
`;

export const SplittedTabs = ({ tabs, onClick, activeTab, className, info }) => {
  const { backdropColor: activeBackdropColor } = getTabInfo(activeTab, info);

  return (
    <StyledSplittedTabs className={className} backdropColor={activeBackdropColor}>
      {tabs.map((tab) => {
        const { text, icon, contentColor, backdropColor } = getTabInfo(tab, info);

        return (
          <SplittedTab
            key={tab}
            onClick={() => onClick(tab)}
            isActive={activeTab === tab}
            withIcon={icon}
            contentColor={contentColor}
            backdropColor={backdropColor}
            activeBackdropColor={activeBackdropColor}
          >
            {icon ? icon : null}

            <p>{text ? text : tab}</p>
          </SplittedTab>
        );
      })}
    </StyledSplittedTabs>
  );
};

const StyledSplittedTabs = styled.div`
  border: ${({ backdropColor }) => `1px solid ${backdropColor || 'var(--editor-border-color)'}`};
  border-radius: 6px;
  display: flex;
  overflow: hidden;
  width: fit-content;
`;

export const SplittedTabsPanels = ({ tabs, activeTab, children, className }) => {
  return Children.map(children, (child, index) => {
    return (
      <Panel isActive={tabs[index] === activeTab} className={className}>
        {child}
      </Panel>
    );
  });
};
