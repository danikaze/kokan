import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { WithTranslation } from 'react-i18next';
import { Expense, PositionData, CurrencySettings } from '../store/model';
import { withTranslation } from '../utils/i18n';
import { Price } from './price';

interface Props extends WithTranslation {
  expense: Expense;
  foreignCurrency: CurrencySettings;
  localCurrency: CurrencySettings;
}

function BaseExpenseListItem({
  expense,
  foreignCurrency,
  localCurrency,
}: Props): JSX.Element {
  return (
    <ExpansionPanel key={expense.id}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Price quantity={expense.foreignPrice} currency={foreignCurrency} />
        <Typography>{expense.comment}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Price quantity={expense.localPrice} currency={localCurrency} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export const ExpenseListItem = withTranslation('page-trip')(
  BaseExpenseListItem
);
