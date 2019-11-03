import { Settings } from '../utils/settings/index.d';

export type Page = 'home' | 'trip' | 'newTrip' | 'editTrip' | 'settings';
export type Lang = 'en' | 'es';

export interface Ui {
  menu: {
    isOpen: boolean;
    travelListOpen: boolean;
  };
}

export interface State {
  lang: Lang;
  settings: Settings;
  currentPage: Page;
  ui: Ui;
}
