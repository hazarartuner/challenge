import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from 'routes';
import { Provider } from 'react-redux';
import configureStore from 'redux/store';
import './App.scss';

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app__component">
          <Switch>
            {Object.keys(routes).map(key => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Route key={key} {...routes[key]} />
            ))}
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};
