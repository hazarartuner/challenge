import { createSelector } from 'reselect';

const selectPageLoader = state => state.app.get('pageLoader');

// eslint-disable-next-line import/prefer-default-export
export const pageLoaderSelector = createSelector(
  [selectPageLoader],
  pageLoader => pageLoader.toJS()
);
