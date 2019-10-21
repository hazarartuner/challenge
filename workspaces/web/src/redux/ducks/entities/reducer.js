import { fromJS, isKeyed } from 'immutable';
import { ENTITIES_FETCH_COMPLETE } from './types';

const initialState = fromJS({
  sessions: {},
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ENTITIES_FETCH_COMPLETE: {
      if (payload.entities) {
        return Object.keys(payload.entities).reduce((newState, entity) => {
          const mergedEntity = newState.get(entity).mergeDeep(fromJS(payload.entities[entity]));

          // Reduce duplicate lists. It may not be so efficient,
          // look better solution when you have time
          const reducedEntity = fromJS(mergedEntity.toJS(), (key, value) => {
            return isKeyed(value) ? value.toMap() : value.toOrderedSet().toList();
          });

          return newState.set(entity, reducedEntity);
        }, state);
      }

      return state;
    }

    default: {
      return state;
    }
  }
};
