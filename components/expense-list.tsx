import { WithTranslation } from 'react-i18next';
import { Typography, List } from '@material-ui/core';
import { withTranslation } from '../utils/i18n';
import { ExpenseListItem } from './expense-list-item';
import { Expense } from '../store/model';

interface Props extends WithTranslation {
  expenses: Expense[];
}

function BaseExpenseList({ t, expenses }: Props): JSX.Element {
  if (!expenses || !expenses.length) {
    return <Typography variant="h6">{t('noExpenses')}</Typography>;
  }

  const expenseList = expenses.map(expense => (
    <ExpenseListItem
      key={expense.id}
      expense={expense}
      foreignCurrency="USD"
      localCurrency="JPY"
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
