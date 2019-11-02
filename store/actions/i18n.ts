import { Action } from 'redux';
import { ThunkActionCreator } from '../../interfaces';
import { i18n } from '../../utils/i18n';
import { Lang } from '../model';

export type I18nAction = I18nSetLangAction | I18nLangLoadAction;

export interface I18nSetLangAction extends Action {
  type: 'I18N_SET_LANG';
  lang: Lang;
}

export interface I18nLangLoadAction extends Action {
  type: 'I18N_LANG_LOAD';
  lang: Lang;
}

/**
 * Changes the language of the application to the desired one.
 * It's changed actually when the translations are available (loaded) so it could be some delay
 */
export const I18nSetLang: ThunkActionCreator<I18nAction> = (lang: Lang) => {
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
