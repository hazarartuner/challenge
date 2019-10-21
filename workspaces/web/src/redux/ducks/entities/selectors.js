import { createSelector } from 'reselect';

const listSessions = state => state.entities.get('sessions');

// eslint-disable-next-line import/prefer-default-export
export const listSessionsSelector = createSelector(
  [listSessions],
  sessions => sessions && sessions.valueSeq().toJS()
);
