import api from 'helpers/api';
import { normalize } from 'normalizr';
import { sessionSchema } from './schemas';
import { ENTITIES_FETCH_START, ENTITIES_FETCH_COMPLETE, ENTITIES_FETCH_ERROR } from './types';

const createAction = (name, method, entitySchema) => (...args) => dispatch => {
  dispatch({
    type: ENTITIES_FETCH_START,
    meta: {
      name,
    },
  });

  return method
    .bind(api)(...args)
    .then(response => {
      const entities = response ? normalize(response, entitySchema) : {};

      dispatch({
        type: ENTITIES_FETCH_COMPLETE,
        payload: {
          ...entities,
        },
      });

      return Promise.resolve(response);
    })
    .catch(error => {
      dispatch({
        type: ENTITIES_FETCH_ERROR,
        payload: {
          error,
        },
      });

      return Promise.reject(error);
    });
};

// eslint-disable-next-line import/prefer-default-export
export const listSessions = createAction('LIST_SESSIONS', api.listSessions, [sessionSchema]);

export const createSession = createAction('CREATE_SESSION', api.createSession, sessionSchema);
