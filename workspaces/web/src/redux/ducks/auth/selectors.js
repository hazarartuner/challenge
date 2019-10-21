import { createSelector } from 'reselect';

const selectUser = state => state.auth.get('account');

// eslint-disable-next-line import/prefer-default-export
export const accountSelector = createSelector(
  [selectUser],
  user => user && user.toJS()
);
