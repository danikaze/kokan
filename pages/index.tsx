import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  styled,
  Container,
} from '@material-ui/core';

import { withRedux } from '../store/with-redux';
import { PageComponent } from '../interfaces';
import { AppTitle } from '../components/app-title';
import { AppMenu } from '../components/app-menu';

const CustomCard = styled(Card)({
  minWidth: 275,
});

/**
 * Index page
 */
const IndexPage: PageComponent = () => {
  return (
    <>
      <AppTitle />
      <AppMenu />

      <Container>
        <CustomCard>
          <CardContent>
            <Typography>Set up!</Typography>
          </CardContent>
        </CustomCard>
      </Container>
    </>
  );
};

export default withRedux(IndexPage);
