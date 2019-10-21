import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import generatePath from 'helpers/generatePath';
import { getUserDetails } from 'redux/ducks/auth/actions';
import { accountSelector } from 'redux/ducks/auth/selectors';
import routes from 'routes';
import './App.scss';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [detachLoader, setDetachLoader] = useState(false);
  const account = useSelector(accountSelector);

  useEffect(() => {
    if (account) {
      setIsLoading(false);
      // Delay this for better UX
      setTimeout(() => {
        setDetachLoader(true);
      }, 1500);
      return;
    }

    dispatch(getUserDetails())
      .then(() => {
        history.push(generatePath('sessions'));
      })
      .catch(() => {
        // Redirect if the user stays in different path
        history.push(generatePath('login'));
      })
      .finally(() => {
        setIsLoading(false);

        // Delay this for better UX
        setTimeout(() => {
          setDetachLoader(true);
        }, 1500);
      });
  }, [dispatch, history, account]);

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
