import { Settings } from '../utils/settings/index.d';

export type Page =
  | 'home'
  | 'trip'
  | 'newTrip'
  | 'editTrip'
  | 'settings'
  | 'error';
export type Lang = 'en' | 'es';
export type PositionData = Pick<
  Coordinates,
  'latitude' | 'longitude' | 'altitude' | 'accuracy'
>;

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

export interface CurrencySettings {
  text: string;
  decimals: number;
  prepend?: boolean;
}

export interface Exchange {
  id: number;
  localCurrency: string;
  localValue: number;
  foreignCurrency: string;
  foreignValue: number;
}

export interface Expense {
  id: number;
  comment?: string;
  foreignPrice: number;
  localPrice: number;
  time: number;
  position?: PositionData;
}

export interface Trip {
  id: number;
  timeOffset: number;
  name: string;
  createdOn: number;
  updatedOn: number;
  foreignCurrency: CurrencySettings;
  localCurrency: CurrencySettings;
  exchanges: Exchange[];
  expenses: Expense[];
}

export interface State {
  settings: Settings;
  userSettings: UserSettings;
  currentPage: Page;
  ui: Ui;
  trips: Trip[];
}
