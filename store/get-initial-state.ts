import { State, Page } from './model';

const urlMappings: { [pathname: string]: Page } = {
  '/': 'home',
  '/new-trip': 'newTrip',
};

export function getInitialState(pathname: string): State {
  let settings;

  if (IS_SERVER) {
    settings = require('../utils/settings').settings;
  }

  return {
    settings,
    lang: 'en',
    userSettings: {
      gps: false,
    },
    currentPage: urlMappings[pathname] || 'error',
    ui: {
      menu: {
        isOpen: false,
        travelListOpen: true,
      },
    },
    travels: [],
  };
}
