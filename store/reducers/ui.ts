import { State } from '../model';
import { UiAction } from '../actions/ui';

export function uiReducer(prevState: State, action: UiAction): State {
  if (action.type !== 'TOGGLE_MENU') {
    return prevState;
  }

  return {
    ...prevState,
    ui: {
      ...prevState.ui,
      menuOpen: action.isOpen,
    },
  };
}
