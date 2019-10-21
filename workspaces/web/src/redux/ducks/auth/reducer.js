import { fromJS } from 'immutable';
import { AUTH_LOGIN_COMPLETE } from './types';

const initialState = fromJS({
  user: null,
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN_COMPLETE: {
      return state.set('user', fromJS(payload.user));
    }

    default: {
      return state;
    }
  }
};
