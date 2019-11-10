import { State } from './model';

/*
 * Menu
 */
export const getIsMenuOpen = (state: State) => state.ui.menu.isOpen;
export const getIsTravelListOpen = (state: State) =>
  state.ui.menu.travelListOpen;
export const getCurrentPage = (state: State) => state.currentPage;

/*
 * Settings
 */
export const getLanguage = (state: State) => state.userSettings.lang;
export const getIsGpsAllowed = (state: State) => state.userSettings.gps;

/*
 * Trips
 */
export const getTrips = (state: State) => state.trips;
export const getTrip = (id: number, state: State) =>
  state.trips.find(trip => trip.id === id);
export const getNextTripId = (state: State) =>
  getTrips(state).reduce((max, trip) => Math.max(max, trip.id), 0) + 1;

export const getExpenses = (tripId: number, state: State) => {
  const trip = getTrip(tripId, state);
  return trip && trip.expenses;
};
export const getExpense = (tripId: number, expenseId: number, state: State) => {
  const trip = getTrip(tripId, state);
  return trip && trip.expenses && trip.expenses.find(e => e.id === expenseId);
};
export const getNextExpenseId = (tripId: number, state: State) => {
  const expenses = getExpenses(tripId, state);
  if (!expenses) {
    return 1;
  }
  return expenses.reduce((max, expense) => Math.max(max, expense.id), 0) + 1;
};
