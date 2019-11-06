import { State } from '../model';
import { StorageAction } from '../actions/storage';

export function storageReducer(prevState: State, action: StorageAction): State {
  if (action.type === 'DATA_LOADED') {
    const { userSettings, trips } = action.data;
    const newState = userSettings || trips ? { ...prevState } : prevState;

    if (userSettings) {
      newState.userSettings = action.data.userSettings;
    }
    if (trips) {
      newState.trips = trips;
    }

    return newState;
  }

  return prevState;
}
