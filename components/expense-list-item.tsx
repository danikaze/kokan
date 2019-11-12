import {
  Link,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { WithTranslation } from 'react-i18next';
import { Expense, PositionData, CurrencySettings } from '../store/model';
import { withTranslation } from '../utils/i18n';
import { Price } from './price';
import LocationIcon from '@material-ui/icons/LocationOn';
import { blueGrey } from '@material-ui/core/colors';

interface Props extends WithTranslation {
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
  location: {
    position: 'absolute',
    right: theme.spacing(3),
  },
}));

function BaseExpenseListItem({
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
        {getPositionIcon(expense.position)}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

function getPositionIcon(position: PositionData): JSX.Element {
  if (!position) return;

  const classes = useStyles(undefined);
  const url = `https://www.google.com/maps?q=${position.latitude},${position.longitude}`;

  return (
    <Link className={classes.location} href={url} target="_blank">
      <LocationIcon fontSize="small" />
    </Link>
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
