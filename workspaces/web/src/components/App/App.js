import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import generatePath from 'helpers/generatePath';
import { pageLoaderSelector } from 'redux/ducks/app/selectors';
import { hidePageLoader } from 'redux/ducks/app/actions';
import { getUserDetails } from 'redux/ducks/auth/actions';
import { accountSelector } from 'redux/ducks/auth/selectors';
import routes from 'routes';
import './App.scss';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pageLoader = useSelector(pageLoaderSelector);
  const account = useSelector(accountSelector);

  useEffect(() => {
    if (account) {
      dispatch(hidePageLoader());
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
        dispatch(hidePageLoader());
      });
  }, [dispatch, history, account]);

  return (
    <div className="app__component">
      {pageLoader.isAttachedToDom && (
        <div className={classNames('page-loader-container', { loading: pageLoader.isVisible })}>
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
