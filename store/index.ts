import {
  createStore as createReduxStore,
  Store,
  compose,
  applyMiddleware,
  Reducer,
  Action,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

/**
 * If we're in dev mode, use the Redux Devtools Extension if available (only in client side)
 */
function getComposer() {
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    return window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
  }
  return compose;
}

// tslint:disable-next-line: no-any
export function createStore<S, A extends Action<any>>(
  state: S,
  rootReducer: Reducer<S, A>
): Store<S, A> {
  const store = createReduxStore(
    rootReducer,
    state,
    getComposer()(applyMiddleware(thunkMiddleware))
  );

  return store;
}
