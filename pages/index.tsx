import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  styled,
  AppBar,
} from '@material-ui/core';

import { PageComponent } from '../interfaces';

const CustomCard = styled(Card)({
  minWidth: 275,
});

/**
 * Index page
 */
const IndexPage: PageComponent = function IndexPage() {
  return (
    <>
      <AppBar position='sticky'>
        <Typography>Kōkan</Typography>
      </AppBar>

      <CustomCard>
        <CardContent>
          <Typography>Set up!</Typography>
        </CardContent>
      </CustomCard>
    </>
  );
};

export default IndexPage;
