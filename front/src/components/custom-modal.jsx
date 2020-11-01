import React from 'react';
import Modal from 'react-modal';
import styled, { createGlobalStyle } from 'styled-components';
import { X } from 'react-feather';

import { br } from '@/utils/styles';

Modal.setAppElement('#custom-modal');

const GlobalStyles = createGlobalStyle`
  .ReactModal__Overlay {
    background-color: var(--backdrop-color) !important;
    overflow: auto;
    padding: 0 16px;
    z-index: 3;
  }

  .ReactModal__Content {
    display: flex;
    flex-direction: column;
    margin: 32px auto 32px;
    width: 100%;
    outline: 0;

    ${br.lg} {
      margin: 90px auto 90px;
      height: calc(100% - 180px);
    }
  }
`;

export const CustomModal = ({ children, className, isOpen, onToggle, header }) => {
  return (
    <StyledCustomModal className={className} isOpen={isOpen} onRequestClose={onToggle}>
      <GlobalStyles />

      <div className="modal-content">
        <div className="modal-header">
          {header}

          <button type="button" className="close-button" onClick={onToggle}>
            <X strokeWidth="1.5px" width="26px" />
          </button>
        </div>

        {children}
      </div>
    </StyledCustomModal>
  );
};

const StyledCustomModal = styled(Modal)`
  .modal-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
  }

  .icon {
    width: 12px;
  }

  .modal-content {
    padding: 32px 24px;
    background-color: var(--base-bg-color);
    border-radius: 12px;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;

    ${br.lg} {
      overflow-y: auto;
    }
  }
`;
