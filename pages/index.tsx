import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  styled,
  Container,
} from '@material-ui/core';

import { PageComponent } from '../interfaces';
import { AppTitle } from '../components/app-title';
import { AppMenu } from '../components/app-menu';

const CustomCard = styled(Card)({
  minWidth: 275,
});

/**
 * Index page
 */
const IndexPage: PageComponent = function IndexPage() {
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

export default IndexPage;
