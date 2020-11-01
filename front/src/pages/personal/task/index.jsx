import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { useForm } from 'react-hook-form';

import { useTabs } from '@/hooks/use-tabs';
import { CodeEditor } from '@/components/code-editor';
import { SplittedTabs, SplittedTabsPanels } from '@/components/splitted-tabs';
import { DispatchesTable } from './components/dispatches-table';
import { Container } from '@/components/container';
import { $task, taskReceived, fileSent, $dispatches, dispatchesReceived } from './model';

const tabsInfo = [
  {
    name: 'code',
    text: 'Код',
  },
  {
    name: 'dispatches',
    text: 'Посылки',
  },
];

export const Task = () => {
  const location = useLocation();
  const parts = location.pathname.split('/');
  const id = parts[parts.length - 1];

  const task = useStore($task);

  const [code, setCode] = useState('');

  const { register, handleSubmit, watch } = useForm();
  const values = watch();

  const onSubmit = (data) => {
    const file = values?.file?.[0];
    const formData = new FormData();
    formData.append('lang', data.lang);
    if (file) formData.append('file', file);
    if (code) formData.append('code', code);

    fileSent({ formData, id });
    setTimeout(() => {
      dispatchesReceived(id);
    }, 500);
    setActiveTab('dispatches');
  };

  const dispatches = useStore($dispatches);

  useEffect(() => {
    taskReceived(id);
    dispatchesReceived(id);
  }, [id]);

  const { tabs, activeTab, setActiveTab } = useTabs(['code', 'dispatches']);

  if (!task.task) {
    return <div>Загрузка...</div>;
  }

  return (
    <StyledTask>
      <Container>
        <div className="wrapper">
          <aside>
            <h3>Статус задачи</h3>
            <div className="aside-block-wrapper">
              <div className="aside-block">
                <div className="aside-block__title">Статус:</div>
                <div className="aside-block__status">{task.status?.toUpperCase() || '—'}</div>
              </div>
              <div className="aside-block">
                <div className="aside-block__title">Оценка:</div>
                <div className="aside-block__status">{task.score || '—'}</div>
              </div>
            </div>
          </aside>
          <div className="main">
            <h3>{task.task.name}</h3>
            <div className="rich-text">
              <p>{task.task.legend}</p>
              <p>{task.task.condition}</p>
            </div>

            <div className="tabs-wrapper">
              <SplittedTabs
                tabs={tabs}
                onClick={setActiveTab}
                activeTab={activeTab}
                info={tabsInfo}
                className="tabs"
              />
              <select name="lang" ref={register}>
                <option value="c">C</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="pascal">Pascal</option>
              </select>
            </div>

            <SplittedTabsPanels tabs={tabs} activeTab={activeTab}>
              <div className="tab code-wrapper">
                <CodeEditor
                  language={values.lang}
                  height="300px"
                  isLoaded
                  className="code-editor"
                  value={code}
                  onChange={(_, value) => setCode(value)}
                />
              </div>
              <div className="daspatcher">
                <DispatchesTable dispatches={dispatches} id={id} />
              </div>
            </SplittedTabsPanels>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" name="file" ref={register} />

          <button type="submit">Отправить</button>
        </form>
      </Container>
    </StyledTask>
  );
};

const StyledTask = styled.div`
  .code-wrapper {
    border: 1px solid var(--editor-border-color);
    padding-bottom: 10px;
  }

  .wrapper {
    display: flex;
  }

  aside {
    width: 180px;
    margin-right: 35px;
    flex-shrink: 0;

    h3 {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }

  .aside-block {
    font-size: 14px;
    padding-bottom: 15px;
    padding-top: 15px;
    border-bottom: 1px solid #e0e0e0;

    &__title {
      color: #696974;
      margin-bottom: 10px;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }

  .main {
    h3 {
      font-size: 16px;
      margin-bottom: 20px;
      font-weight: 500;
      color: #696974;
    }
    flex-grow: 1;
  }

  .rich-text {
    p {
      margin-bottom: 28px;
    }
  }

  .daspatcher {
    max-height: 340px;
    overflow-y: auto;
  }

  .tabs {
    margin-bottom: 14px;
  }

  form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 24px;

    margin-left: auto;

    button {
      padding: 6px 8px;
      background-color: var(--color-set-4);
      border-radius: 6px;
    }
  }

  .tabs-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
