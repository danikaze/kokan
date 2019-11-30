import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: pink['500'],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
