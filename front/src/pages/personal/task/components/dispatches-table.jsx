import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { DispatchModalContent } from './dispatch-modal-content';
import { CustomModal } from '@/components/custom-modal';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('ru') + ' ' + date.toLocaleDateString('ru');
};

export const DispatchesTable = ({ dispatches, id }) => {
  const [modalState, setModalState] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(!isOpen), [isOpen]);

  return (
    <StyledDispatchesTable>
      <table className="table">
        <thead>
          <tr>
            <th>Время посылки</th>
            <th>Статус</th>
            <th>Баллы</th>
            <th>Время исполнения</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dispatches.map((dispatch, index) => (
            <tr key={index}>
              <td>{formatDate(dispatch.sent_dt)}</td>
              <td>{dispatch.status ? dispatch.status.toUpperCase() : 'CHECK'}</td>
              <td>{dispatch.score}</td>
              <td>{dispatch.exec_time}ms</td>
              <td>
                <button
                  className="report-link"
                  type="button"
                  onClick={() => {
                    setModalState(dispatch.id);
                    toggleOpen();
                  }}
                >
                  Отчет
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal isOpen={isOpen} onToggle={toggleOpen}>
        <DispatchModalContent id={id} pk={modalState} />
      </CustomModal>
    </StyledDispatchesTable>
  );
};

const StyledDispatchesTable = styled.div`
  table {
    width: 100%;
    border: 1px solid var(--editor-border-color);
    overflow: hidden;
  }

  tr {
    border-bottom: 1px solid var(--editor-border-color);
  }

  th {
    text-align: left;
  }

  td,
  th {
    padding: 20px;
  }

  .report-link {
    color: var(--color-malibu);
  }
`;
