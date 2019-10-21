import api from 'helpers/api';
import { AUTH_LOGIN_START, AUTH_LOGIN_COMPLETE, AUTH_LOGIN_ERROR } from './types';

// eslint-disable-next-line import/prefer-default-export
export const login = email => dispatch => {
  dispatch({
    type: AUTH_LOGIN_START,
  });

  return api
    .login(email)
    .then(user => {
      dispatch({
        type: AUTH_LOGIN_COMPLETE,
        payload: {
          user,
        },
      });

      return Promise.resolve(user);
    })
    .catch(error => {
      dispatch({
        type: AUTH_LOGIN_ERROR,
        payload: {
          error,
        },
      });

      return Promise.reject(error);
    });
};
