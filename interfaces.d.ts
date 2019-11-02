import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { NextAppContext } from 'next/app';
import { Action } from './store/actions';
import { NsLogger } from './utils/logger';

export type ActionCreator<A> = (...args) => A;
export type ThunkActionCreator<A> = (
  ...args
) => (dispatch: Dispatch<A>, getState: () => State) => void;
export type ThunkDispatch = ThunkDispatch<State, null, Action>;

/**
 * Data received by each page returned by `getInitialProps`
 */
export interface PageInitialProps {}

/**
 * Interface for every exported component in /pages
 */
export interface PageComponent {
  /* The function to render the page itself */
  (): JSX.Element;
  /* Instance of the logger provided by _app */
  logger?: NsLogger;
  /* Function to be executed in server side or when transitioning to another page in client */
  getInitialProps?(context: NextAppContext): PageInitialProps;
}
