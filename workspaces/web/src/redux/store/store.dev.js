import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from 'redux/ducks';

export default function configureStore(preloadedState = {}) {
  /* eslint-disable no-underscore-dangle */
  const middlewares = [thunkMiddleware];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewareEnhancer = applyMiddleware(...middlewares);
  /* eslint-enable */

  const combinedReducers = combineReducers(reducers);

  return createStore(combinedReducers, preloadedState, composeEnhancers(middlewareEnhancer));
}
