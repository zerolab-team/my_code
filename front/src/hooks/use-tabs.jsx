import React, { useState } from 'react';

export const useTabs = (initialTabs) => {
  const [tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState(initialTabs[0]);

  return { tabs, setTabs, activeTab, setActiveTab };
};

export const Tab = ({ children, onClick, className, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export const Panel = ({ children, isActive, className }) => {
  const classList = `${isActive ? '' : 'visually-hidden'} ${className ?? ''}`;

  return <div className={classList}>{children}</div>;
};
