declare module '*.png';
declare module '*.jpg';
declare module '*.gif';

/** Env constant set to (package.json).name */
declare const PACKAGE_NAME: string;
/** Env constant set to (package.json).version */
declare const PACKAGE_VERSION: string;
/** Env constant set to `true` for the code to use in server side, `false` for the one delivered to the client */
declare const IS_SERVER: boolean;
/** Env constant set to `true` for the production build, `false` for development */
declare const IS_PRODUCTION: boolean;
