import { Action } from 'redux';
import { ThunkActionCreator, ActionCreator } from '../index';
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

    if (useGps) {
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
function addPositionData(
  dispatch,
  getState: () => State,
  tripId: number,
  expenseId: number
): Promise<void> {
  return new Promise(resolve => {
    function coordsToPosition(coords: Coordinates): PositionData {
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
      };
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const expense = getExpense(tripId, expenseId, getState());
      if (!expense) {
        return;
      }

      dispatch(
        addOrEditExpense(tripId, {
          ...expense,
          position: coordsToPosition(coords),
        })
      );
      resolve();
    });
  });
}
