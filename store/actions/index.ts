import { SettingAction } from './settings';
import { UiAction } from './ui';
import { NavAction } from './nav';

export type Action = SettingAction | UiAction | NavAction;
