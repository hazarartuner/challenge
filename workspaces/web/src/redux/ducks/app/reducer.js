import { fromJS } from 'immutable';
import {
  APP_PAGE_LOADER_SHOW,
  APP_PAGE_LOADER_HIDE,
  APP_PAGE_LOADER_DETACH_FROM_DOM,
  APP_PAGE_LOADER_ATTACH_TO_DOM,
} from './types';

const initialState = fromJS({
  pageLoader: {
    isVisible: true,
    isAttachedToDom: true,
  },
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case APP_PAGE_LOADER_SHOW: {
      return state.setIn(['pageLoader', 'isVisible'], true);
    }

    case APP_PAGE_LOADER_HIDE: {
      return state.setIn(['pageLoader', 'isVisible'], false);
    }

    case APP_PAGE_LOADER_ATTACH_TO_DOM: {
      return state.setIn(['pageLoader', 'isAttachedToDom'], true);
    }

    case APP_PAGE_LOADER_DETACH_FROM_DOM: {
      return state.setIn(['pageLoader', 'isAttachedToDom'], false);
    }

    default: {
      return state;
    }
  }
};
