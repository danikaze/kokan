import { Action } from 'redux';
import { ActionCreator } from '../index';
import { Page } from '../model';

export type NavAction = ChangePageAction;

export interface ChangePageAction extends Action {
  type: 'CHANGE_PAGE';
  page: Page;
  tripId?: number;
}

export const changePage: ActionCreator<ChangePageAction> = (
  page: Page,
  tripId?: number
) => ({
  page,
  tripId,
  type: 'CHANGE_PAGE',
});
