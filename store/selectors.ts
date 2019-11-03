import { State } from './model';

export const getIsMenuOpen = (state: State) => state.ui.menu.isOpen;
export const getIsTravelListOpen = (state: State) =>
  state.ui.menu.travelListOpen;
export const getCurrentPage = (state: State) => state.currentPage;
