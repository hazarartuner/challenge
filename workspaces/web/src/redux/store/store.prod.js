import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from 'redux/ducks';

export default function configureStore(preloadedState = null) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(reducers, preloadedState, compose(middlewareEnhancer));
}
