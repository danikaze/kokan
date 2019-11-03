import { Settings } from '../utils/settings/index.d';

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
  ui: Ui;
}
