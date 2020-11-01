import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { CodeEditor } from '@/components/code-editor';
import { $dispatch, dispatchReceived } from '../model';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('ru') + ' ' + date.toLocaleDateString('ru');
};

export const DispatchModalContent = ({ id, pk }) => {
  const dispatch = useStore($dispatch);

  useEffect(() => {
    dispatchReceived({ id, pk });
  }, [id, pk]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('ru') + ' ' + date.toLocaleDateString('ru');
  };

  return (
    <StyledDispatchModalContent>
      <p>Посылка {dispatch.sent_dt ? formatDate(dispatch.sent_dt) : ''}</p>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Статус</th>
            <th>Время выполнения</th>
          </tr>
        </thead>
        <tbody>
          {dispatch.results?.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.status?.toUpperCase()}</td>
              <td>{dispatch.exec_time}ms</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CodeEditor
        language={dispatch?.lang}
        height="300px"
        value={dispatch?.code}
        isLoaded={dispatch?.code}
        className="code-editor"
        editorOptions={{ readOnly: true }}
      />
    </StyledDispatchModalContent>
  );
};

const StyledDispatchModalContent = styled.div`
  .statuses {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;

    li {
      width: 46px;
      height: 46px;
      border-radius: 4px;
      background-color: var(--color-set-4);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
    }
  }

  .table {
    width: 100%;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  td,
  th {
    text-align: center;
    border: 1px solid var(--color-set-4);
  }

  .code-editor {
    border: 1px solid var(--color-set-4);
    border-radius: 4px;
    overflow: hidden;
  }
`;
