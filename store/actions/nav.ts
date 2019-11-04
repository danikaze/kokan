import { Action } from 'redux';
import { ActionCreator } from '../index';
import { Page } from '../model';

export type NavAction = ChangePageAction;

export interface ChangePageAction extends Action {
  type: 'CHANGE_PAGE';
  page: Page;
}

export const changePage: ActionCreator<ChangePageAction> = (page: Page) => ({
  page,
  type: 'CHANGE_PAGE',
});
