import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import generatePath from 'helpers/generatePath';
import { getUserDetails } from 'redux/ducks/auth/actions';
import routes from 'routes';
import './App.scss';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [detachLoader, setDetachLoader] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails())
      .catch(() => {
        // Redirect if the user stays in different path
        history.push(generatePath('loginPage'));
      })
      .finally(() => {
        setIsLoading(false);

        // Delay this for better UX
        setTimeout(() => {
          setDetachLoader(true);
        }, 1500);
      });
  }, [dispatch, history]);

  return (
    <div className="app__component">
      {!detachLoader && (
        <div className={classNames('page-loader-container', { loading: isLoading })}>
          <div className="page-loader">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
      <Switch>
        {Object.keys(routes).map(key => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Route key={key} {...routes[key]} />
        ))}
      </Switch>
    </div>
  );
};
