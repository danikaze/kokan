import { NextAppContext } from 'next/app';
import { NsLogger } from './utils/logger';
import { WithTranslation } from 'next-i18next';

/**
 * Data received by each page returned by `getInitialProps`
 */
export interface PageInitialProps {}

/**
 * Interface for every exported component in /pages
 */
export interface PageComponent {
  /* The function to render the page itself */
  (props: Partial<WithTranslation>): JSX.Element;
  /* Instance of the logger provided by _app */
  logger?: NsLogger;
  /* Function to be executed in server side or when transitioning to another page in client */
  getInitialProps?(context: NextAppContext): PageInitialProps;
}
