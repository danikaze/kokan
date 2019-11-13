import {
  createStore as createReduxStore,
  Store,
  compose,
  applyMiddleware,
  Reducer,
  Action,
} from 'redux';
import thunkMiddleware, {
  ThunkDispatch as ReduxThunkDispatch,
} from 'redux-thunk';
import { State } from './model';

export type ThunkDispatch<A extends Action> = ReduxThunkDispatch<
  State,
  null,
  A
>;
export type ActionCreator<A extends Action> = (...args) => A;
export type ThunkActionCreator<A extends Action> = (
  ...args
) => (dispatch: ThunkDispatch<A>, getState: () => State) => void;

/**
 * If we're in dev mode, use the Redux Devtools Extension if available (only in client side)
 */
function getComposer() {
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    return window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
  }
  return compose;
}

export function createStore<S, A extends Action<unknown>>(
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
