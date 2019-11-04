import { State } from '../model';
import { SettingAction } from '../actions/settings';

export function settingsReducer(
  prevState: State,
  action: SettingAction
): State {
  if (action.type === 'SETTING_CHANGE') {
    return {
      ...prevState,
      userSettings: {
        ...prevState.userSettings,
        [action.name]: action.value,
      },
    };
  }

  return prevState;
}
