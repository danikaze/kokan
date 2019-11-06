import { Action } from 'redux';
import { ThunkActionCreator } from '..';
import { loadStoredData } from '../../utils/storage';
import { State } from '../model';
import { setLanguage } from './settings';

export type StorageAction = DataLoadedAction;

interface DataLoadedAction extends Action {
  type: 'DATA_LOADED';
  data: Pick<State, 'userSettings' | 'trips'>;
}

export const loadData: ThunkActionCreator<DataLoadedAction> = () => {
  return async dispatch => {
    const data = await loadStoredData();
    dispatch(setLanguage(data.userSettings.lang));
    dispatch({
      data,
      type: 'DATA_LOADED',
    });
  };
};
