import { Provider } from 'react-redux';
import { createStore } from './index';
import { mainReducer } from './reducers';
import { State } from './model';
import { Store } from 'redux';
import { Action } from './actions';
import { getInitialState } from './get-initial-state';
import { init as initLogger, getLogger } from '../utils/logger';
import { PageComponent } from '../interfaces';

export const withRedux = (
  PageComponent: PageComponent,
  { ssr = true } = {}
) => {
  const WithRedux = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState);

    // would be nicer if we can access the state of the store outside withRedux
    // so this code is not here...
    if (!IS_SERVER) {
      initLogger(store.getState().settings.log);
      PageComponent.logger = getLogger(PageComponent.name);
    }

    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    );
  };

  // Set the correct displayName in development
  if (!IS_PRODUCTION) {
    const displayName = PageComponent.name || 'Component';
    WithRedux.displayName = `withRedux(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async context => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrInitializeStore(getInitialState());

      // Provide the store to getInitialProps of pages
      context.reduxStore = reduxStore;

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(context)
          : {};

      // Pass props to PageComponent
      return {
        ...pageProps,
        initialReduxState: reduxStore.getState(),
      };
    };
  }

  return WithRedux;
};

let reduxStore: Store<State, Action>;
const getOrInitializeStore = (initialState?: State) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (IS_SERVER) {
    return createStore(initialState, mainReducer);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = createStore(initialState, mainReducer);
  }

  return reduxStore;
};
