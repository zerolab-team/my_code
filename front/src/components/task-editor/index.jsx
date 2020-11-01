import React, { useRef } from 'react';
import styled from 'styled-components';
import useComponentSize from '@rehooks/component-size';
import { Code, Flag } from 'react-feather';

import { CodeView } from './components/code-view';
import { TestsView } from './components/tests-view';
import { ConsoleView } from './components/console-view';
import { TasksView } from './components/tasks-view';
import { Toolbar } from './components/toolbar';
import { useTabs } from '../../hooks/use-tabs';
import { SplittedTabs, SplittedTabsPanels } from '../splitted-tabs';

const tabsInfo = [
  {
    name: 'code',
    text: 'Код',
    icon: <Code strokeWidth="1.5px" width="16px" />,
    contentColor: 'var(--color-set-1)',
    backdropColor: 'var(--color-sushi)',
  },
  {
    name: 'tests',
    text: 'Тесты',
    icon: <Flag strokeWidth="1.5px" width="16px" />,
    contentColor: 'var(--color-set-1)',
    backdropColor: 'var(--color-malibu)',
  },
];

export const TaskEditor = ({
  userRole,
  title,
  language,
  codeValue,
  codeHeight,
  codeTimeout,
  testValue,
  testHeight,
  testTimeout,
  isConsoleOpen,
  consoleValue,
  className,
}) => {
  const editorsRef = useRef(null);

  const { tabs, activeTab, setActiveTab } = useTabs(['code', 'tests']);
  const editorsSize = useComponentSize(editorsRef);

  return (
    <StyledTaskEditor className={className}>
      <Toolbar title={title} className="toolbar" />

      <div className="content">
        <div className="tasks">
          <TasksView minHeight={editorsSize.height} width="350px" />
        </div>

        <div className="editors-wrapper">
          <div className="editors" ref={editorsRef}>
            <div className="sub-toolbar">
              {userRole === 'teacher' ? (
                <SplittedTabs
                  className="sub-tabs"
                  tabs={tabs}
                  info={tabsInfo}
                  activeTab={activeTab}
                  onClick={setActiveTab}
                />
              ) : null}

              <div className="sub-select">javascript</div>
            </div>

            {userRole === 'teacher' ? (
              <SplittedTabsPanels tabs={tabs} activeTab={activeTab}>
                <CodeView
                  language={language}
                  value={codeValue}
                  height={codeHeight}
                  timeout={codeTimeout}
                />

                <TestsView
                  language={language}
                  value={testValue}
                  height={testHeight}
                  timeout={testTimeout}
                  isLoaded={activeTab === 'tests'}
                />
              </SplittedTabsPanels>
            ) : (
              <CodeView
                language={language}
                value={codeValue}
                height={codeHeight}
                timeout={codeTimeout}
              />
            )}

            <ConsoleView value={consoleValue} isOpen={isConsoleOpen} withTopBorder />
          </div>
        </div>
      </div>
    </StyledTaskEditor>
  );
};

const StyledTaskEditor = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--editor-background-color);
  box-shadow: 0 3px 15px -3px var(--editor-box-shadow-color);
  position: relative;

  > .content {
    display: flex;
    position: relative;

    > .editors-wrapper {
      width: 100%;
      overflow-x: auto;
    }
  }

  .sub-toolbar {
    padding: 0 14px;
    min-height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--editor-border-color);
  }

  .sub-tabs {
    margin: 6px 8px 6px 0;
    white-space: nowrap;
  }

  .sub-select {
    margin: 6px 0;
  }
`;
