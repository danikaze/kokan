import { Settings } from '../utils/settings/index.d';

export type Lang = 'en' | 'es';

export interface Ui {
  menuOpen: boolean;
}

export interface State {
  lang: Lang;
  settings: Settings;
  ui: Ui;
}
