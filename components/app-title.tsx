import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { theme } from '../utils/theme';
import { withTranslation } from '../utils/i18n';
import { toggleMenu } from '../store/actions/ui';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  hamburger: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

function BaseAppTitle(): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles({});

  function handleMenuButtonClick() {
    dispatch(toggleMenu());
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.hamburger}
          onClick={handleMenuButtonClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        <Typography className={classes.title} variant="h6">
          Kōkan
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export const AppTitle = withTranslation('title')(BaseAppTitle);
