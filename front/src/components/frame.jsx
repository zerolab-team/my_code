import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export const Frame = ({ children, title, ...props }) => {
  const [contentRef, setContentRef] = useState(null);

  const frameDocument = contentRef?.contentWindow?.document?.body;

  return (
    <iframe {...props} title={title} ref={setContentRef}>
      {frameDocument && createPortal(children, frameDocument)}
    </iframe>
  );
};
