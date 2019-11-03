import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PageComponent, PageInitialProps } from '../interfaces';
import { appWithTranslation } from '../utils/i18n';
import { init as initLogger, getLogger } from '../utils/logger';
import { theme } from '../utils/theme';
import { APP_TITLE } from '../constants/app';

if (IS_SERVER) {
  initServer();
}

interface Props {
  Component: PageComponent;
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

  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>{APP_TITLE}</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default appWithTranslation(Main);
