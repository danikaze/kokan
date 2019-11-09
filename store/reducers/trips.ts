import { State } from '../model';
import { TripAction } from '../actions/trips';
import { storeTrip } from '../../utils/storage';
import { spliceCopy } from '../../utils/splice-copy';

export function tripsReducer(prevState: State, action: TripAction): State {
  if (action.type === 'NEW_TRIP') {
    const trips = [action.trip, ...prevState.trips];

    storeTrip(action.trip.id, trips);

    return {
      ...prevState,
      trips,
    };
  }

  if (action.type === 'EXPENSE') {
    const tripIndex = prevState.trips.findIndex(
      trip => trip.id === action.tripId
    );
    const trip = prevState.trips[tripIndex];
    const expenseIndex = trip.expenses.findIndex(
      expense => expense.id === action.expense.id
    );

    const expenses =
      expenseIndex === -1
        ? [action.expense, ...trip.expenses]
        : spliceCopy(trip.expenses, expenseIndex, action.expense);

    const newState = {
      ...prevState,
      trips: spliceCopy(prevState.trips, tripIndex, {
        ...trip,
        expenses,
      }),
    };

    storeTrip(action.tripId, newState.trips);

    return newState;
  }

  return prevState;
}
