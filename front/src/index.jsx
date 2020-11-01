import React from 'react';
import { render } from 'react-dom';

import { App } from './components/app';
import * as serviceWorker from './utils/service-worker';
import './styles';

render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
