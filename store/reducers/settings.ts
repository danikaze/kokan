import { State, UserSettings } from '../model';
import { SettingAction } from '../actions/settings';
import { storeUserSettings } from '../../utils/storage';

export function settingsReducer(
  prevState: State,
  action: SettingAction
): State {
  if (action.type === 'SETTING_CHANGE') {
    const userSettings: UserSettings = {
      ...prevState.userSettings,
      [action.name]: action.value,
    };

    storeUserSettings(userSettings);
    return {
      ...prevState,
      userSettings,
    };
  }

  return prevState;
}
