import { WithTranslation } from 'react-i18next';
import { Typography, List } from '@material-ui/core';
import { withTranslation } from '../utils/i18n';
import { ExpenseListItem } from './expense-list-item';
import { Trip } from '../store/model';

interface Props extends WithTranslation {
  trip: Trip;
}

function BaseExpenseList({ t, trip }: Props): JSX.Element {
  if (!trip.expenses || !trip.expenses.length) {
    return <Typography variant="h6">{t('noExpenses')}</Typography>;
  }

  const expenseList = trip.expenses.map(expense => (
    <ExpenseListItem
      key={expense.id}
      tripId={trip.id}
      expense={expense}
      foreignCurrency={trip.foreignCurrency}
      localCurrency={trip.localCurrency}
    />
  ));

  return (
    <>
      <Typography variant="h6">{t('expenses')}</Typography>
      <List>{expenseList}</List>
    </>
  );
}

export const ExpenseList = withTranslation('page-trip')(BaseExpenseList);
