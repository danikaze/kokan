import { State } from '../model';
import { TripAction } from '../actions/trips';

export function tripsReducer(prevState: State, action: TripAction): State {
  if (action.type === 'NEW_TRIP') {
    return {
      ...prevState,
      trips: [action.trip, ...prevState.trips],
    };
  }

  return prevState;
}
