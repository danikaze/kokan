import { I18nAction } from './i18n';
import { UiAction } from './ui';
import { NavAction } from './nav';

export type Action = I18nAction | UiAction | NavAction;
