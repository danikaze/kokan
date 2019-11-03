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
import { APP_TITLE } from '../constants/app';

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
        <Typography className={classes.title} variant="h6" display="inline">
          {APP_TITLE} {PACKAGE_VERSION}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export const AppTitle = withTranslation('title')(BaseAppTitle);
