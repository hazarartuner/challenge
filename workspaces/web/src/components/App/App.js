import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from 'routes';
import './App.scss';

export default () => {
  return (
    <div className="app__component">
      <BrowserRouter>
        <Switch>
          {Object.keys(routes).map(key => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Route key={key} {...routes[key]} />
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
};
