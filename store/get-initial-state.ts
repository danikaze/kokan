import { State, Page } from './model';

const urlMappings: { [pathname: string]: Page } = {
  '/': 'home',
  '/new-trip': 'newTrip',
  '/trip': 'trip',
};

export function getInitialState(pathname: string): State {
  let settings;

  if (IS_SERVER) {
    settings = require('../utils/settings').settings;
  }

  return {
    settings,
    userSettings: {
      lang: 'en',
      gps: false,
    },
    ui: {
      currentPage: urlMappings[pathname] || 'error',
      menu: {
        isOpen: false,
        travelListOpen: true,
      },
    },
    trips: [],
  };
}
