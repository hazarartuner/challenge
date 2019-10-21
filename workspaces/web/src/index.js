import React from 'react';
import { render } from 'react-dom';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux/store';

const store = configureStore();

const appRoot = document.getElementById('app-root');

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  appRoot
);

if (module.hot) {
  module.hot.accept('components/App', () => {
    // eslint-disable-next-line global-require
    const HotApp = require('components/App').default;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HotApp />
        </BrowserRouter>
      </Provider>,
      appRoot
    );
  });
}
