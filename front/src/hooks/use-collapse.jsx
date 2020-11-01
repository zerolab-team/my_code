import React, { useState } from 'react';

export const useCollapse = (initialState) => {
  const [isOpen, setOpen] = useState(initialState);
  const toggleOpen = () => setOpen(!isOpen);

  return { isOpen, setOpen, toggleOpen };
};

export const Toggler = ({ children, className, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export const Content = ({ children, isOpen, className }) => {
  const classList = `${isOpen ? '' : 'visually-hidden'} ${className ?? ''}`;

  return <div className={classList}>{children}</div>;
};
