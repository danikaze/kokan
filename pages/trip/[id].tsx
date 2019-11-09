import { useDispatch, useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Container, Typography, List, ListItem } from '@material-ui/core';
import { initPage } from '../../utils/init-page';
import { PageComponent } from '../../interfaces';
import { withRedux } from '../../store/with-redux';
import { AppTitle } from '../../components/app-title';
import { AppMenu } from '../../components/app-menu';
import { PageTitle } from '../../components/page-title';
import { getTrip } from '../../store/selectors';
import { useRouter } from 'next/router';
import { Trip, Expense } from '../../store/model';
import { PriceInput } from '../../components/price-input';

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
  const contents = trip ? renderTrip({ t, trip }) : renderNotFound({ t });

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

function renderTrip({ t, trip }): JSX.Element {
  return (
    <>
      <PageTitle>{trip.name}</PageTitle>

      <PriceInput tripId={trip.id} />

      {renderExpenses(t, trip.expenses)}
    </>
  );
}

function renderExpenses(t, expenses: Expense[]): JSX.Element {
  if (!expenses || !expenses.length) {
    return <Typography variant="h6">{t('noExpenses')}</Typography>;
  }

  return (
    <>
      <Typography variant="h6">{t('expenses')}</Typography>
      <List>{expenses.map(renderExpense)}</List>
    </>
  );
}

function renderExpense(expense: Expense): JSX.Element {
  return (
    <ListItem key={expense.id}>
      {expense.foreignPrice} USD ({expense.localPrice} JPY){' '}
      <span>{expense.comment}</span>
    </ListItem>
  );
}

export default withRedux(withTranslation('page-trip')(TripPage) as undefined);
