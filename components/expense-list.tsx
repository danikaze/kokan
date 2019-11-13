import { WithTranslation } from 'react-i18next';
import { Typography, List } from '@material-ui/core';
import { withTranslation } from '../utils/i18n';
import { ExpenseListItem } from './expense-list-item';
import { Expense, CurrencySettings } from '../store/model';

interface Props extends WithTranslation {
  tripId: number;
  expenses: Expense[];
}

// TODO: Get this from the db/State
const foreignCurrency: CurrencySettings = {
  text: 'USD',
  decimals: 2,
};
const localCurrency: CurrencySettings = {
  text: 'JPY',
  decimals: 0,
};

function BaseExpenseList({ t, tripId, expenses }: Props): JSX.Element {
  if (!expenses || !expenses.length) {
    return <Typography variant="h6">{t('noExpenses')}</Typography>;
  }

  const expenseList = expenses.map(expense => (
    <ExpenseListItem
      key={expense.id}
      tripId={tripId}
      expense={expense}
      foreignCurrency={foreignCurrency}
      localCurrency={localCurrency}
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
