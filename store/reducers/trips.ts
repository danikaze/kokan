import { State, Expense, Trip } from '../model';
import {
  TripAction,
  RemoveExpenseAction,
  AddNewExpenseAction,
} from '../actions/trips';
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

  if (action.type === 'REMOVE_EXPENSE' || action.type === 'EXPENSE') {
    const newState = {
      ...prevState,
      trips: modifyTripExpense(
        prevState,
        action.tripId,
        (action as RemoveExpenseAction).expenseId ||
          (action as AddNewExpenseAction).expense.id,
        (action as AddNewExpenseAction).expense
      ),
    };

    storeTrip(action.tripId, newState.trips);
    return newState;
  }

  return prevState;
}

function modifyTripExpense(
  state: State,
  tripId: number,
  expenseId: number,
  newExpense?: Expense
): Trip[] {
  const tripIndex = state.trips.findIndex(trip => trip.id === tripId);
  const trip = state.trips[tripIndex];
  const expenseIndex = trip.expenses.findIndex(
    expense => expense.id === expenseId
  );

  if (expenseIndex === -1 && !newExpense) {
    return state.trips;
  }

  const expenses =
    expenseIndex === -1
      ? [newExpense, ...trip.expenses]
      : spliceCopy(trip.expenses, expenseIndex, newExpense);

  return spliceCopy(state.trips, tripIndex, {
    ...trip,
    expenses,
  });
}
