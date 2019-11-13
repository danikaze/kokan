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

// don't wait more than 1 sec for the location
const LOCATION_TIMEOUT = 1000;

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
    let position: PositionData;

    if (useGps) {
      position = await getPosition(dispatch, getState, tripId, expenseId);
    }

    const completeExpense: Expense = {
      ...expense,
      position,
      time: Date.now(),
      id: expenseId,
    };

    dispatch({
      tripId,
      expense: completeExpense,
      type: 'EXPENSE',
    });
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

function getPosition(
  dispatch,
  getState: () => State,
  tripId: number,
  expenseId: number
): Promise<PositionData> {
  return new Promise(resolve => {
    let hasTimedOut = false;

    function coordsToPosition(coords: Coordinates): PositionData {
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
      };
    }

    // if timeouts, resolve to undefined
    const timeoutHandler = setTimeout(() => {
      resolve();
      hasTimedOut = true;
    }, LOCATION_TIMEOUT);

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // if timed out, dispatch a modification for that action adding the location data
      if (hasTimedOut) {
        const expense = getExpense(tripId, expenseId, getState());
        dispatch(
          addOrEditExpense({
            tripId,
            expense: {
              ...expense,
              position: coordsToPosition(coords),
            },
          })
        );
        return;
      }

      // resolve with the location data
      clearTimeout(timeoutHandler);
      resolve(coordsToPosition(coords));
    });
  });
}
