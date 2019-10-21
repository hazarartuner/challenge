import {
  APP_PAGE_LOADER_SHOW,
  APP_PAGE_LOADER_HIDE,
  APP_PAGE_LOADER_ATTACH_TO_DOM,
  APP_PAGE_LOADER_DETACH_FROM_DOM,
} from './types';

export const showPageLoader = () => dispatch => {
  dispatch({
    type: APP_PAGE_LOADER_ATTACH_TO_DOM,
  });

  window.requestAnimationFrame(() => {
    dispatch({
      type: APP_PAGE_LOADER_SHOW,
    });
  });
};

export const hidePageLoader = () => dispatch => {
  dispatch({
    type: APP_PAGE_LOADER_HIDE,
  });

  // Delay for animation complete
  setTimeout(() => {
    dispatch({
      type: APP_PAGE_LOADER_DETACH_FROM_DOM,
    });
  }, 500);
};
