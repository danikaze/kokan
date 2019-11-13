import {
  Link,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { WithTranslation } from 'react-i18next';
import { Expense, CurrencySettings } from '../store/model';
import { withTranslation } from '../utils/i18n';
import { Price } from './price';
import LocationIcon from '@material-ui/icons/LocationOn';
import { blueGrey } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { removeExpense } from '../store/actions/trips';

interface Props extends WithTranslation {
  tripId: number;
  expense: Expense;
  foreignCurrency: CurrencySettings;
  localCurrency: CurrencySettings;
}

const useStyles = makeStyles(theme => ({
  foreignPrice: {
    fontWeight: 'bold',
    minWidth: '100px',
    marginRight: theme.spacing(1),
    textAlign: 'right',
  },
  localPrice: {
    minWidth: '100px',
    marginRight: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.primary.main,
  },
  date: {
    color: blueGrey['300'],
  },
  actions: {
    position: 'absolute',
    right: theme.spacing(3),
  },
  position: {
    position: 'absolute',
    right: 24,
  },
  delete: {
    position: 'absolute',
    right: 0,
  },
}));

function BaseExpenseListItem({
  tripId,
  expense,
  foreignCurrency,
  localCurrency,
}: Props): JSX.Element {
  const classes = useStyles(undefined);

  return (
    <ExpansionPanel key={expense.id}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Price
          className={classes.foreignPrice}
          quantity={expense.foreignPrice}
          currency={foreignCurrency}
        />
        <Typography>{expense.comment}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Price
          className={classes.localPrice}
          quantity={expense.localPrice}
          currency={localCurrency}
        />
        {getExpenseDate(expense.time)}
        {getActionIcons(tripId, expense)}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

function getActionIcons(tripId: number, expense: Expense): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles(undefined);

  const positionIcon = (() => {
    if (!expense.position) return;
    const { latitude, longitude } = expense.position;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return (
      <Link className={classes.position} href={url} target="_blank">
        <LocationIcon fontSize="small" />
      </Link>
    );
  })();

  function handleClick() {
    dispatch(removeExpense(tripId, expense.id));
  }

  const deleteIcon = (
    <Link className={classes.delete} color="secondary" onClick={handleClick}>
      <DeleteIcon fontSize="small" />
    </Link>
  );

  return (
    <div className={classes.actions}>
      {positionIcon}
      {deleteIcon}
    </div>
  );
}

function getExpenseDate(timestamp: number): JSX.Element {
  const d = new Date(timestamp);
  const classes = useStyles(undefined);

  return (
    <Typography className={classes.date}>
      {d.toLocaleDateString()} {d.toLocaleTimeString()}
    </Typography>
  );
}

export const ExpenseListItem = withTranslation('page-trip')(
  BaseExpenseListItem
);
