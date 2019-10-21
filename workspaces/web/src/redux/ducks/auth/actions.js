import api from 'helpers/api';
import cookies from 'js-cookie';
import {
  AUTH_LOGIN_START,
  AUTH_LOGIN_COMPLETE,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER_START,
  AUTH_REGISTER_COMPLETE,
  AUTH_REGISTER_ERROR,
} from './types';

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

      cookies.set('accessToken', user.token);

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

export const register = ({ name, email, role }) => dispatch => {
  dispatch({
    type: AUTH_REGISTER_START,
  });

  return api
    .register({ name, email, role })
    .then(user => {
      dispatch({
        type: AUTH_REGISTER_COMPLETE,
        payload: {
          user,
        },
      });

      cookies.set('accessToken', user.token);

      return Promise.resolve(user);
    })
    .catch(error => {
      dispatch({
        type: AUTH_REGISTER_ERROR,
        payload: {
          error,
        },
      });

      return Promise.reject(error);
    });
};
