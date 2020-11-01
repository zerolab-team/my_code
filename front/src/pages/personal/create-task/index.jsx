import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';

import { TestTable } from '@/components/test-table';
import { Container } from '@/components/container';
import { Meta } from '@/components/meta';
import { SplittedTabs, SplittedTabsPanels } from '@/components/splitted-tabs';
import { useTabs } from '@/hooks/use-tabs';
import { CodeEditor } from '@/components/code-editor';
import {
  taskCreated,
  createTaskFx,
  codeTestCreated,
  tableTestCreated,
  $table,
  tableUpdated,
  tableTestAdded,
  codeChanged,
  $code,
} from './model';

const infoTabsInfo = [
  {
    name: 'legend',
    text: 'Легенда',
  },
  {
    name: 'condition',
    text: 'Условия',
  },
];

const testsTabsInfo = [
  {
    name: 'code',
    text: 'Чекер',
  },
  {
    name: 'table',
    text: 'Тестовые данные',
  },
];

export const CreateTask = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: { lang: 'c' },
  });
  const values = watch();
  const onSubmit = (data) => {
    taskCreated({ legend: data.legend, condition: data.condition, name: title });
  };

  // const [code, setCode] = useState('');

  const table = useStore($table);
  const code = useStore($code);
  const history = useHistory();

  const { tabs: infoTabs, activeTab: activeInfoTab, setActiveTab: setActiveInfoTab } = useTabs([
    'legend',
    'condition',
  ]);

  const { tabs: testsTabs, activeTab: activeTestsTab, setActiveTab: setActiveTestsTab } = useTabs([
    'code',
    'table',
  ]);

  const [title, setTitle] = useState('');

  useEffect(() => {
    createTaskFx.finally.watch(({ status }) => {
      if (status === 'done') {
        codeTestCreated({ lang: values.lang });
      }
      if (status === 'done') {
        tableTestCreated();
      }
    });
  }, [values.lang]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <StyledCreateTask>
      <Meta name="create-task" />

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AutosizeInput
            placeholder="Название задачи"
            className="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />

          <SplittedTabs
            tabs={infoTabs}
            onClick={setActiveInfoTab}
            activeTab={activeInfoTab}
            info={infoTabsInfo}
          />

          <SplittedTabsPanels tabs={infoTabs} activeTab={activeInfoTab}>
            <div className="text-editor">
              <textarea name="legend" ref={register} />
            </div>

            <div className="text-editor">
              <textarea name="condition" ref={register} />
            </div>
          </SplittedTabsPanels>

          <div className="tests-block">
            <div className="tests-block-header">
              <SplittedTabs
                tabs={testsTabs}
                onClick={setActiveTestsTab}
                activeTab={activeTestsTab}
                info={testsTabsInfo}
              />

              <select name="lang" ref={register} className="lang-select">
                <option value="c">C</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="pascal">Pascal</option>
              </select>
            </div>

            <SplittedTabsPanels tabs={testsTabs} activeTab={activeTestsTab}>
              <CodeEditor
                language={values.lang}
                value={code}
                onChange={(_, value) => codeChanged(value)}
                height="300px"
                isLoaded
                className="code-editor"
              />

              <TestTable tests={table} setTests={tableUpdated} addTests={tableTestAdded} />
            </SplittedTabsPanels>
          </div>

          <div className="buttons">
            <button type="button" onClick={() => history.goBack(-1)}>
              Отменить
            </button>
            <button type="submit">Отправить задачу</button>
          </div>
        </form>
      </Container>
    </StyledCreateTask>
  );
};

const StyledCreateTask = styled.div`
  padding-left: 20px;

  .title {
    border-bottom: 2px solid #696974;
    margin-bottom: 35px;
    max-width: 360px;

    > input {
      margin-bottom: 4px;
      border: none;
      min-width: 220px;
      max-width: 360px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
      font-size: 18px;

      &:placeholder {
        color: #696974;
      }
    }
  }

  /* Simple styles */
  form {
    display: flex;
    flex-direction: column;
  }

  .text-editor {
    width: 100%;
    margin: 12px 0;

    textarea {
      margin-top: 8px;
      height: 100px;
      border: 1px solid var(--color-set-7);
      border-radius: 5px;
    }
  }

  textarea {
    margin: 8px 0;
    height: 100px;
    width: 100%;
    border: 1px solid var(--color-set-7);
  }

  .tests-block-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .lang-select {
  }

  .code-editor {
    border: 1px solid var(--editor-border-color);
    border-radius: 5px;
    overflow: hidden;
  }

  .buttons {
    button {
      margin-top: 24px;
      padding: 6px 8px;
      background-color: var(--color-set-4);
      border-radius: 6px;

      &:not(:last-of-type) {
        margin-right: 10px;
      }
    }
  }
`;
