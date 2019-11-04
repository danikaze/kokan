import { State } from './model';

/*
 * Menu
 */
export const getIsMenuOpen = (state: State) => state.ui.menu.isOpen;
export const getIsTravelListOpen = (state: State) =>
  state.ui.menu.travelListOpen;
export const getCurrentPage = (state: State) => state.currentPage;

/*
 * Settings
 */
export const getLanguage = (state: State) => state.userSettings.lang;
export const getIsGpsAllowed = (state: State) => state.userSettings.gps;

/*
 * Trips
 */
export const getTrips = (state: State) => state.trips;
