import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PageComponent, PageInitialProps } from '../interfaces';
import { getInitialState } from '../store/get-initial-state';
import { appWithTranslation } from '../utils/i18n';
import { init as initLogger, getLogger } from '../utils/logger';
import { createStore } from '../store';
import { State } from '../store/model';
import { mainReducer } from '../store/reducers';
import { cleanStateForClient } from '../store/clean-state-for-client';
import theme from '../utils/theme';

const NEXT_STORE_GLOBAL_VAR = '__NEXT_STORE__';

if (IS_SERVER) {
  initServer();
}

interface Props {
  Component: PageComponent;
}

function getOrCreateState(): State {
  let state: State;
  // Server side
  if (IS_SERVER) {
    // Always make a new store (otherwise state is shared between requests)
    state = getInitialState();
    // Client side
  } else {
    // Create store if unavailable on the client and set it on the window object
    if (!window[NEXT_STORE_GLOBAL_VAR]) {
      window[NEXT_STORE_GLOBAL_VAR] = getInitialState.apply(null, arguments);
    }
    state = window[NEXT_STORE_GLOBAL_VAR];
  }

  return state;
}

/**
 * Initialize the server.
 * This would be apart if using a custom Express server, but defined here for now
 */
function initServer(): void {
  // Even if this function is only called when IS_SERVER, this `if` is still needed to remove code in build time
  // tslint:disable-next-line: early-exit
  if (IS_SERVER) {
    // settings are initialized only in the server side and passed to the client by the initial state
    const initSettings = require('../utils/settings').init;
    initSettings(!IS_PRODUCTION ? 'data/settings/dev.json' : undefined);
    const settings = require('../utils/settings').settings;
    // logger is initializated only once in server side
    initLogger(settings.log);
  }
}

class Main extends App<Props, PageInitialProps> {
  public static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (IS_SERVER) {
      // provide a namespaced logger to each PageComponent
      Component.logger = getLogger(Component.name);
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps: {
        namespacesRequired: ['template'],
        ...pageProps,
      },
    };
  }

  protected static getStoreScriptHtml(state: State): string {
    const frontendState = cleanStateForClient(state);

    return `
      <script id="${NEXT_STORE_GLOBAL_VAR}">
        {window["${NEXT_STORE_GLOBAL_VAR}"] = ${JSON.stringify(frontendState)};}
      </script>
    `;
  }

  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps } = this.props;
    const state = getOrCreateState();

    if (!IS_SERVER) {
      initLogger(state.settings.log);
      Component.logger = getLogger(Component.name);
    }

    const store = createStore(state, mainReducer);

    return (
      <>
        <Head>
          <title>Kōkan</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
          <div
            dangerouslySetInnerHTML={{ __html: Main.getStoreScriptHtml(state) }}
          />
        </ThemeProvider>
      </>
    );
  }
}

export default appWithTranslation(Main);
