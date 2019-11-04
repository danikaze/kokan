import { Reducer } from 'react';
import { State } from '../model';
import { Action } from '../actions';
import { settingsReducer } from './settings';
import { uiReducer } from './ui';
import { navReducer } from './nav';

/**
 * List of partial reducers to aply (in order).
 * All of the reducers defined here will receive the same data, but it allows splitting the code
 */
const reducerList: Reducer<State, Action>[] = [
  settingsReducer,
  uiReducer,
  navReducer,
];

/**
 * This function will "combine" all the defined reducers in `reducerList`.
 * If any reducer modifies the state (that is, return a new State object), the rest of the reducers
 * won't be evaluated anymore and the result will be returned.
 * If none of the reducers modify the state, the original will be returned.
 * In short, it works like a switch, but automatically.
 */
export const mainReducer: Reducer<State, Action> = (prevState, action) => {
  const keys = Object.keys(reducerList);
  let res = prevState;

  for (const key of keys) {
    res = reducerList[key](prevState, action);
    if (res !== prevState) {
      return res;
    }
  }

  return prevState;
};
