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
import { Menu } from '../components/menu';

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
      <Menu />

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
