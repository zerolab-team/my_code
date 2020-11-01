import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Grid, Code } from 'react-feather';

import { CodeEditor } from '../../code-editor';

export const TestsView = ({ value, className, language, height, timeout, isLoaded }) => {
  const [testsType, setTestsType] = useState(null);

  return (
    <StyledTestsView className={className}>
      {testsType !== null ? (
        <div className="tests-toolbar">
          <button type="button" onClick={() => setTestsType(null)}>
            <ArrowLeft strokeWidth="1.5px" width="20px" /> Выбрать тип тестов
          </button>
        </div>
      ) : null}

      {testsType === null ? (
        <div className="tests-choose">
          <p>Выберите тип тестов, которые хотите написать</p>

          <div className="tests-buttons">
            <button type="button" onClick={() => setTestsType('code')}>
              <Code strokeWidth="1.5px" width="30px" height="30px" />
              <p>Код</p>
            </button>

            <button type="button" onClick={() => setTestsType('table')}>
              <Grid strokeWidth="1.5px" width="30px" height="30px" />
              <p>Таблица</p>
            </button>
          </div>

          <div className="tests-info">
            <p>Код - Вы можете написать свои тесты без ограничений</p>
            <p>
              Таблица - Вы можете указать входные и выходные типы данных или загрузить свою таблицу
            </p>
          </div>
        </div>
      ) : null}

      {testsType === 'table' ? <p>Таблица с тестами</p> : null}

      {testsType === 'code' ? (
        <CodeEditor
          language={language}
          value={value}
          height={height}
          timeout={timeout}
          isLoaded={isLoaded}
        />
      ) : null}
    </StyledTestsView>
  );
};

const StyledTestsView = styled.div`
  background-color: var(--editor-background-color);

  .tests-toolbar {
    border-bottom: 1px solid var(--editor-border-color);
    padding: 7px 14px;

    button {
      display: flex;
      align-items: center;

      &:hover {
        svg {
          transform: scale(1.05);
        }
      }
    }

    svg {
      margin-right: 6px;
    }
  }

  .tests-choose {
    padding: 7px;

    > p {
      padding: 0 7px;
      margin-bottom: 25px;
      margin-top: 7px;
    }

    button {
      min-width: 120px;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--editor-border-color);
      border-radius: 12px;
      margin: 7px;
      padding: 10px;
      box-shadow: 0 3px 11px -3px var(--tab-shadow-color);
      color: var(--tab-content-color);

      &:hover {
        transform: scale(1.05);
      }

      &:first-of-type {
        background-color: var(--color-sushi);
        color: var(--color-set-1);
      }

      &:last-of-type {
        background-color: var(--color-yellow-orange);
        color: var(--color-set-1);
      }

      svg {
        margin-bottom: 14px;
      }
    }

    .tests-buttons {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 25px;
    }

    .tests-info {
      margin-bottom: 7px;
      padding: 0 7px;

      p {
        font-size: 14px;

        &:not(:last-of-type) {
          margin-bottom: 12px;
        }
      }
    }
  }
`;
