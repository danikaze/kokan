import { Settings } from '../utils/settings/index.d';

export type Page =
  | 'home'
  | 'trip'
  | 'newTrip'
  | 'editTrip'
  | 'settings'
  | 'error';
export type Lang = 'en' | 'es';

export interface UserSettings {
  lang: Lang;
  gps: boolean;
}

export interface Ui {
  menu: {
    isOpen: boolean;
    travelListOpen: boolean;
  };
}

export interface State {
  settings: Settings;
  userSettings: UserSettings;
  currentPage: Page;
  ui: Ui;
}
