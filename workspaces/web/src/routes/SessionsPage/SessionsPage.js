import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listSessions } from 'redux/ducks/entities/actions';
import { listSessionsSelector } from 'redux/ducks/entities/selectors';
import { showPageLoader, hidePageLoader } from 'redux/ducks/app/actions';
import { accountSelector } from 'redux/ducks/auth/selectors';
import generatePath from 'helpers/generatePath';
import './SessionsPage.scss';

// const generatePath = () => '/';

const SessionsPage = () => {
  const dispatch = useDispatch();
  const sessions = useSelector(listSessionsSelector);
  const account = useSelector(accountSelector);

  useEffect(() => {
    dispatch(showPageLoader());
    dispatch(listSessions())
      .catch(() => {
        // @todo: Create an app specific notification modal and use it in here
      })
      .finally(() => {
        // delay it for better UX
        setTimeout(() => {
          dispatch(hidePageLoader());
        }, 1500);
      });
  }, [dispatch]);

  return (
    <div className="sessions__page">
      <h1>Sessions List</h1>
      <table>
        <tbody>
          {sessions &&
            sessions.map(({ id, title, slug }) => {
              const to =
                account &&
                generatePath(
                  account.role === 'MASTER'
                    ? 'planningForScrumMasterPage'
                    : 'planningForDeveloperPage',
                  { slug }
                );

              return (
                <tr key={id}>
                  <td>{title}</td>
                  <td>
                    <Link to={to} className="button secondary">
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {account && account.role === 'MASTER' && (
        <Link to={generatePath('createSession')} className="button create">
          New Session
        </Link>
      )}
    </div>
  );
};

export default SessionsPage;
