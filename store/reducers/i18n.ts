import { State } from '../model';
import { I18nAction } from '../actions/i18n';

export function i18nReducer(prevState: State, action: I18nAction): State {
  if (action.type !== 'I18N_LANG_LOAD') {
    return prevState;
  }

  return {
    ...prevState,
    lang: action.lang,
  };
}
