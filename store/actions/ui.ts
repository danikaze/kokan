import { Action } from 'redux';
import { ThunkActionCreator } from '../../interfaces';

export type UiAction = ToggleMenu;

export interface ToggleMenu extends Action {
  type: 'TOGGLE_MENU';
  isOpen: boolean;
}

export const toggleMenu: ThunkActionCreator<ToggleMenu> = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_MENU',
      isOpen: !getState().ui.menuOpen,
    });
  };
};
