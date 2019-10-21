import { fromJS } from 'immutable';
import {
  AUTH_GET_USER_DETAILS_COMPLETE,
  AUTH_LOGIN_COMPLETE,
  AUTH_REGISTER_COMPLETE,
} from './types';

const initialState = fromJS({
  account: null,
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_REGISTER_COMPLETE:
    case AUTH_GET_USER_DETAILS_COMPLETE:
    case AUTH_LOGIN_COMPLETE: {
      return state.set('account', fromJS(payload.user));
    }

    default: {
      return state;
    }
  }
};
