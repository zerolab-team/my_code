import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { monaco } from '@monaco-editor/react';
import { useStore } from 'effector-react';

import { Routes } from '../routes';
import { Tooltips } from './tooltips';
import { userInfoReceived } from '@/models/user';
import { $isAuth } from '@/models/auth';

monaco.init().then((instance) => {
  instance.editor.defineTheme('custom-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: '1C1C24' }],
    colors: {
      'editor.background': '#1c1c24',
    },
  });
});

export const App = () => {
  const isAuth = useStore($isAuth);

  useEffect(() => {
    if (isAuth) {
      userInfoReceived();
    }
  }, [isAuth]);

  return (
    <Fragment>
      <Router>
        <Routes />
      </Router>

      <Tooltips />
    </Fragment>
  );
};
