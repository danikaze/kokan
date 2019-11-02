import { Settings } from '../utils/settings/index.d';

export type Lang = 'en' | 'es';

export interface State {
  lang: Lang;
  settings: Settings;
}
