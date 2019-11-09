import { Action } from 'redux';
import { ThunkActionCreator } from '../index';
import { Trip, Expense } from '../model';
import { getNextExpenseId, getNextTripId, getIsGpsAllowed } from '../selectors';

export type TripAction = AddNewTrip | AddNewExpense;

interface AddNewTrip extends Action {
  type: 'NEW_TRIP';
  trip: Trip;
}

interface AddNewExpense extends Action {
  type: 'EXPENSE';
  tripId: number;
  expense: Expense;
}

export const addNewTrip: ThunkActionCreator<AddNewTrip> = (name: string) => {
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

export const addOrEditExpense: ThunkActionCreator<AddNewExpense> = (
  tripId: number,
  expense: Pick<Expense, 'foreignPrice' | 'localPrice' | 'comment'> & {
    id?: number;
  }
) => {
  return async (dispatch, getState) => {
    const useGps = getIsGpsAllowed(getState());
    let position: Pick<
      Coordinates,
      'latitude' | 'longitude' | 'altitude' | 'accuracy'
    >;

    if (useGps) {
      position = await new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
            altitude: coords.altitude,
            accuracy: coords.accuracy,
          });
        });
      });
    }

    const completeExpense: Expense = {
      ...expense,
      position,
      time: Date.now(),
      id: expense.id || getNextExpenseId(tripId, getState()),
    };

    dispatch({
      tripId,
      expense: completeExpense,
      type: 'EXPENSE',
    });
  };
};
