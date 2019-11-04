import { Action } from 'redux';
import { ThunkActionCreator, ActionCreator } from '../../interfaces';
import { i18n } from '../../utils/i18n';
import { Lang } from '../model';

export type SettingAction =
  | SetLanguageAction
  | LanguageLoadedAction
  | SetSettingAction;

interface SetLanguageAction extends Action {
  type: 'I18N_SET_LANG';
  lang: Lang;
}

interface LanguageLoadedAction extends Action {
  type: 'I18N_LANG_LOAD';
  lang: Lang;
}

interface SetSettingAction extends Action {
  type: 'SETTING_CHANGE';
  name: string;
  value: unknown;
}

/**
 * Changes the language of the application to the desired one.
 * It's changed actually when the translations are available (loaded) so it could be some delay
 */
export const setLanguage: ThunkActionCreator<
  SetLanguageAction | LanguageLoadedAction
> = (lang: Lang) => {
  return dispatch => {
    i18n.changeLanguage(lang, error => {
      if (error) {
        return;
      }

      dispatch({
        lang,
        type: 'I18N_LANG_LOAD',
      });
    });

    dispatch({
      lang,
      type: 'I18N_SET_LANG',
    });
  };
};

export const setSetting: ActionCreator<SetSettingAction> = (
  name: string,
  value: unknown
) => ({
  name,
  value,
  type: 'SETTING_CHANGE',
});
