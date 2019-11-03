import { Action } from 'redux';
import { ThunkActionCreator } from '../../interfaces';

export type UiAction = ToggleMenu | ToggleTravelList;

export interface ToggleMenu extends Action {
  type: 'TOGGLE_MENU';
  isOpen: boolean;
}

export interface ToggleTravelList extends Action {
  type: 'TOGGLE_TRAVEL_LIST';
  isOpen: boolean;
}

export const toggleMenu: ThunkActionCreator<ToggleMenu> = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_MENU',
      isOpen: !getState().ui.menu.isOpen,
    });
  };
};

export const toggleTravelList: ThunkActionCreator<ToggleTravelList> = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_TRAVEL_LIST',
      isOpen: !getState().ui.menu.travelListOpen,
    });
  };
};
