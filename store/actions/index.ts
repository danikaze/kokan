import { SettingAction } from './settings';
import { UiAction } from './ui';
import { NavAction } from './nav';
import { TripAction } from './trips';

export type Action = SettingAction | UiAction | NavAction | TripAction;
