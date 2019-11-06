import { State } from '../model';
import { TripAction } from '../actions/trips';
import { storeTrip } from '../../utils/storage';

export function tripsReducer(prevState: State, action: TripAction): State {
  if (action.type === 'NEW_TRIP') {
    const trips = [action.trip, ...prevState.trips];

    storeTrip(action.trip.id, trips);

    return {
      ...prevState,
      trips,
    };
  }

  return prevState;
}
