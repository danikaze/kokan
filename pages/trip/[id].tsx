import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { initPage } from '../../utils/init-page';
import { PageComponent } from '../../interfaces';
import { withRedux } from '../../store/with-redux';
import { AppTitle } from '../../components/app-title';
import { AppMenu } from '../../components/app-menu';
import { PageTitle } from '../../components/page-title';
import { getTrip } from '../../store/selectors';
import { useRouter } from 'next/router';
import { Trip } from '../../store/model';
import { PriceInput } from '../../components/price-input';
import { withTranslation } from '../../utils/i18n';
import { ExpenseList } from '../../components/expense-list';

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

function renderTrip({ trip }): JSX.Element {
  return (
    <>
      <PageTitle>{trip.name}</PageTitle>
      <PriceInput tripId={trip.id} />
      <ExpenseList tripId={trip.id} expenses={trip.expenses} />
    </>
  );
}

export default withRedux(withTranslation('page-trip')(TripPage) as undefined);
