import { PageComponent } from '../interfaces';
import { Container, Typography } from '@material-ui/core';
import { withRedux } from '../store/with-redux';
import { AppTitle } from '../components/app-title';
import { AppMenu } from '../components/app-menu';

/**
 * Add New Trip Page
 */
const NewTripPage: PageComponent = function NewTripPage() {
  return (
    <>
      <AppTitle />
      <AppMenu />

      <Container>
        <Typography variant="h2">Add new trip</Typography>
      </Container>
    </>
  );
};

export default withRedux(NewTripPage);
