/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { CodeEditor } from '../code-editor';
import { SplittedTabs, SplittedTabsPanels } from '../splitted-tabs';
import { useTabs } from '../../hooks/use-tabs';
import { $theme } from '../../models/theme';

// Raw styles
import scrollbarStyles from '!!raw-loader!../../styles/scrollbar.css';
import themeStyles from '!!raw-loader!../../styles/variables/theme.css';
import sizeStyles from '!!raw-loader!../../styles/variables/size.css';

const tabsInfo = [
  {
    name: 'html',
    text: 'html',
    contentColor: 'var(--color-set-1)',
    backdropColor: 'var(--color-yellow-orange)',
  },
  {
    name: 'css',
    text: 'css',
    contentColor: 'var(--color-set-1)',
    backdropColor: 'var(--color-malibu)',
  },
  {
    name: 'js',
    text: 'javascript',
    contentColor: 'var(--color-set-1)',
    backdropColor: 'var(--color-bright-sun)',
  },
];

export const WebEditor = () => {
  const iframeRef = useRef();
  const htmlRef = useRef();
  const cssRef = useRef();
  const jsRef = useRef();

  const theme = useStore($theme);

  const { tabs, activeTab, setActiveTab } = useTabs(['html', 'css', 'js']);

  const handleRunCode = useCallback(() => {
    const code = iframeRef.current?.contentWindow?.document;

    const html = htmlRef.current ? htmlRef.current.getValue() : '';
    const css = cssRef.current ? cssRef.current.getValue() : '';
    const js = jsRef.current ? jsRef.current.getValue() : '';

    const content = `
      <!DOCTYPE html>

      <html lang="ru">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <title>Document</title>

          <style>
            ${themeStyles}
            ${sizeStyles}
            ${scrollbarStyles}

            body {
              font-family: system-ui;
              font-size: 16px;
              background-color: var(--editor-background-color);
              color: var(--base-text-color);
            }
          </style>
          <style>${css}</style>
        </head>

        <body class="${theme}">
          ${html}

          <script type="text/javascript">${js}</script>
        </body>
      </html>
    `;

    if (code) {
      code.open();
      code.write(content);
      code.close();
    }
  }, [theme]);

  useEffect(() => {
    handleRunCode();
  }, [handleRunCode]);

  return (
    <StyledWebEditor>
      <div className="toolbar">
        <SplittedTabs
          className="sub-tabs"
          tabs={tabs}
          info={tabsInfo}
          activeTab={activeTab}
          onClick={setActiveTab}
        />
      </div>

      <div className="editors" onKeyUp={handleRunCode}>
        <SplittedTabsPanels tabs={tabs} activeTab={activeTab}>
          <CodeEditor language="html" height="250px" valueGetter={htmlRef} isLoaded />

          <CodeEditor
            language="css"
            height="250px"
            isLoaded={activeTab === 'css'}
            valueGetter={cssRef}
          />

          <CodeEditor
            language="javascript"
            height="250px"
            isLoaded={activeTab === 'js'}
            valueGetter={jsRef}
          />
        </SplittedTabsPanels>
      </div>

      <iframe className="preview" title="preview" ref={iframeRef} />
    </StyledWebEditor>
  );
};

const StyledWebEditor = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--editor-background-color);
  box-shadow: 0 3px 15px -3px var(--editor-box-shadow-color);

  .toolbar {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--editor-border-color);
    padding: 0 14px;
    min-height: 46px;
  }

  .editors {
    border-bottom: 1px solid var(--editor-border-color);
    width: 100%;
  }

  .editor-view {
    border: 2px solid black;
    border-radius: 6px;
    height: 300px;
    width: 100%;

    &:not(:last-of-type) {
      margin-right: 12px;
    }
  }

  .preview {
    width: 100%;
    height: 300px;
  }
`;
