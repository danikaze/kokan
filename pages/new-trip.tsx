import { PageComponent } from '../interfaces';
import { Container } from '@material-ui/core';
import { withTranslation } from '../utils/i18n';
import { withRedux } from '../store/with-redux';
import { AppTitle } from '../components/app-title';
import { AppMenu } from '../components/app-menu';
import { PageTitle } from '../components/page-title';

/**
 * Add New Trip Page
 */
const NewTripPage: PageComponent = function NewTripPage({ t }) {
  return (
    <>
      <AppTitle />
      <AppMenu />

      <Container>
        <PageTitle>{t('pageTitle')}</PageTitle>
      </Container>
    </>
  );
};

export default withRedux(withTranslation('page-new-trip')(
  NewTripPage
) as undefined);
