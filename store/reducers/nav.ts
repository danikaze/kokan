import { State } from '../model';
import { NavAction } from '../actions/nav';

export function navReducer(prevState: State, action: NavAction): State {
  if (action.type !== 'CHANGE_PAGE') {
    return prevState;
  }

  return {
    ...prevState,
    currentPage: action.page,
    ui: {
      ...prevState.ui,
      menu: {
        ...prevState.ui.menu,
        isOpen: false,
      },
    },
  };
}
