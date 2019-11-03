import { Action } from 'redux';
import { ThunkActionCreator } from '../../interfaces';

export type UiAction = ToggleMenuAction | ToggleTravelListAction;

export interface ToggleMenuAction extends Action {
  type: 'TOGGLE_MENU';
  isOpen: boolean;
}

export interface ToggleTravelListAction extends Action {
  type: 'TOGGLE_TRAVEL_LIST';
  isOpen: boolean;
}

export const toggleMenu: ThunkActionCreator<ToggleMenuAction> = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_MENU',
      isOpen: !getState().ui.menu.isOpen,
    });
  };
};

export const toggleTravelList: ThunkActionCreator<
  ToggleTravelListAction
> = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_TRAVEL_LIST',
      isOpen: !getState().ui.menu.travelListOpen,
    });
  };
};
