import { State } from '../model';
import { UiAction } from '../actions/ui';

export function uiReducer(prevState: State, action: UiAction): State {
  if (action.type === 'TOGGLE_MENU') {
    return {
      ...prevState,
      ui: {
        ...prevState.ui,
        menu: {
          ...prevState.ui.menu,
          isOpen: action.isOpen,
        },
      },
    };
  }

  if (action.type === 'TOGGLE_TRAVEL_LIST') {
    return {
      ...prevState,
      ui: {
        ...prevState.ui,
        menu: {
          ...prevState.ui.menu,
          travelListOpen: action.isOpen,
        },
      },
    };
  }

  return prevState;
}
