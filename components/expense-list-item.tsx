import { ListItem } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';
import { Expense } from '../store/model';
import { withTranslation } from '../utils/i18n';

interface Props extends WithTranslation {
  expense: Expense;
  foreignCurrency: string;
  localCurrency: string;
}

function BaseExpenseListItem({
  expense,
  foreignCurrency,
  localCurrency,
}: Props): JSX.Element {
  return (
    <ListItem key={expense.id}>
      {expense.foreignPrice} {foreignCurrency}({expense.localPrice}{' '}
      {localCurrency}) <span>{expense.comment}</span>
    </ListItem>
  );
}

export const ExpenseListItem = withTranslation('page-trip')(
  BaseExpenseListItem
);
