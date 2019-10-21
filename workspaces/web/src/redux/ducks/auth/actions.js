import { AUTH_LOGIN_START, AUTH_LOGIN_COMPLETE } from './types';

// eslint-disable-next-line import/prefer-default-export
export const login = (name, email, role) => dispatch => {
  dispatch({
    type: AUTH_LOGIN_START,
  });

  return new Promise(resolve => {
    setTimeout(() => {
      dispatch({
        type: AUTH_LOGIN_COMPLETE,
        payload: {
          user: {
            id: 1,
            name,
            email,
            role,
          },
        },
      });

      resolve();
    }, 1000);
  });
};
