import { Action } from 'redux';
import { ThunkActionCreator, ActionCreator, ThunkDispatch } from '../index';
import { Trip, Expense, State, PositionData } from '../model';
import {
  getNextExpenseId,
  getNextTripId,
  getIsGpsAllowed,
  getExpense,
} from '../selectors';

export type TripAction =
  | AddNewTripAction
  | AddNewExpenseAction
  | RemoveExpenseAction;

export interface AddNewTripAction extends Action {
  type: 'NEW_TRIP';
  trip: Trip;
}

export interface AddNewExpenseAction extends Action {
  type: 'EXPENSE';
  tripId: number;
  expense: Expense;
}

export interface RemoveExpenseAction extends Action {
  type: 'REMOVE_EXPENSE';
  tripId: number;
  expenseId: number;
}

export const addNewTrip: ThunkActionCreator<AddNewTripAction> = (
  name: string
) => {
  return (dispatch, getState) => {
    const nextId = getNextTripId(getState());
    const now = Date.now();
    const trip = {
      name,
      id: nextId,
      timeOffset: 0,
      createdOn: now,
      updatedOn: now,
      exchanges: [],
      expenses: [],
    };

    dispatch({
      trip,
      type: 'NEW_TRIP',
    });
  };
};

export const addOrEditExpense: ThunkActionCreator<AddNewExpenseAction> = (
  tripId: number,
  expense: Pick<Expense, 'foreignPrice' | 'localPrice' | 'comment'> & {
    id?: number;
  }
) => {
  return async (dispatch, getState) => {
    const useGps = getIsGpsAllowed(getState());
    const expenseId = expense.id || getNextExpenseId(tripId, getState());

    const completeExpense: Expense = {
      ...expense,
      time: (expense && (expense as Expense).time) || Date.now(),
      id: expenseId,
    };

    dispatch({
      tripId,
      expense: completeExpense,
      type: 'EXPENSE',
    });

    if (useGps && !completeExpense.position) {
      // position data is added always afterwards, so it's not blocking
      addPositionData(dispatch, getState, tripId, expenseId);
    }
  };
};

export const removeExpense: ActionCreator<RemoveExpenseAction> = (
  tripId: number,
  expenseId: number
) => ({
  tripId,
  expenseId,
  type: 'REMOVE_EXPENSE',
});

/**
 * Add position data to an existing expense
 */
async function addPositionData(
  dispatch: ThunkDispatch<AddNewExpenseAction>,
  getState: () => State,
  tripId: number,
  expenseId: number
): Promise<void> {
  const expense = getExpense(tripId, expenseId, getState());
  if (!expense) {
    return;
  }
  const position = await getPositionData();
  dispatch(
    addOrEditExpense(tripId, {
      ...expense,
      position,
    })
  );
}

/**
 * Get a `PositionData` object using the `geolocation` API
 */
async function getPositionData(): Promise<PositionData> {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // returning `undefined` instead of `null` makes the values not to be stringified if they don't exist
      resolve({
        latitude: coords.latitude || undefined,
        longitude: coords.longitude || undefined,
        altitude: coords.altitude || undefined,
        accuracy: coords.accuracy || undefined,
      });
    });
  });
}
