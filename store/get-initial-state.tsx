import { State } from './model';

export function getInitialState(): State {
  let settings;

  if (IS_SERVER) {
    settings = require('../utils/settings').settings;
  }

  return {
    settings,
    lang: 'en',
  };
}
