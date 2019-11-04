import { Action } from 'redux';
import { ThunkActionCreator } from '../index';
import { Trip } from '../model';

export type TripAction = AddNewTrip;

interface AddNewTrip extends Action {
  type: 'NEW_TRIP';
  trip: Trip;
}

export const addNewTrip: ThunkActionCreator<AddNewTrip> = (name: string) => {
  return (dispatch, getState) => {
    const lastId = getState().trips.reduce(
      (max, trip) => Math.max(max, trip.id),
      0
    );
    const now = Date.now();
    const trip = {
      name,
      id: lastId + 1,
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
