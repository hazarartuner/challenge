import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from 'components/App';

const appRoot = document.getElementById('app-root');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  appRoot
);

if (module.hot) {
  module.hot.accept('components/App', () => {
    // eslint-disable-next-line global-require
    const HotApp = require('components/App').default;

    render(
      <BrowserRouter>
        <HotApp />
      </BrowserRouter>,
      appRoot
    );
  });
}
