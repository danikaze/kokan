import { useDispatch, useSelector } from 'react-redux';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { initPage } from '../../utils/init-page';
import { PageComponent } from '../../interfaces';
import { withRedux } from '../../store/with-redux';
import { AppTitle } from '../../components/app-title';
import { AppMenu } from '../../components/app-menu';
import { PageTitle } from '../../components/page-title';
import { getTrip, getTotalExpenses } from '../../store/selectors';
import { useRouter } from 'next/router';
import { Trip } from '../../store/model';
import { PriceInput } from '../../components/price-input';
import { withTranslation } from '../../utils/i18n';
import { ExpenseList } from '../../components/expense-list';
import { Price } from '../../components/price';

function useTrip(): Trip {
  const router = useRouter();
  // TODO: Why router.query is empty?
  // const id = (router.query.id as unknown) as Number;
  const id = /\/trip\/(\d+)/.exec(router.asPath)[1];
  const trip = useSelector(getTrip.bind(null, Number(id))) as Trip;

  return trip;
}

/**
 * Trip details page
 */
const TripPage: PageComponent = function TripPage({ t }) {
  initPage(useDispatch());
  const trip = useTrip();
  const contents = trip ? renderTrip({ trip }) : renderNotFound({ t });

  return (
    <>
      <AppTitle />
      <AppMenu />

      <Container>{contents}</Container>
    </>
  );
};

function renderNotFound({ t }): JSX.Element {
  return <PageTitle>{t('notFound')}</PageTitle>;
}

const useStyles = makeStyles(theme => ({
  totalExpenses: {},
  foreignPrice: {
    marginRight: theme.spacing(1),
  },
  localPrice: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

function renderTrip({ trip }: { trip: Trip }): JSX.Element {
  const total = getTotalExpenses(trip);
  const classes = useStyles(undefined);

  return (
    <>
      <PageTitle>
        {trip.name}
        <Typography className={classes.totalExpenses}>
          <Price
            className={classes.foreignPrice}
            display="initial"
            quantity={total.foreign}
            currency={trip.foreignCurrency}
          />
          /
          <Price
            className={classes.localPrice}
            display="initial"
            quantity={total.local}
            currency={trip.localCurrency}
          />
        </Typography>
      </PageTitle>

      <PriceInput tripId={trip.id} />
      <ExpenseList trip={trip} />
    </>
  );
}

export default withRedux(withTranslation('page-trip')(TripPage) as undefined);
