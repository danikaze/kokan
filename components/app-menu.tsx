import { useMemo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  makeStyles,
  Divider,
  Collapse,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import SettingsIcon from '@material-ui/icons/Settings';
import { withTranslation } from '../utils/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu, toggleTravelList } from '../store/actions/ui';
import {
  getIsMenuOpen,
  getIsTravelListOpen,
  getCurrentPage,
} from '../store/selectors';
import { Link } from './link';

const useStyles = makeStyles(theme => ({
  menuList: {
    width: 'auto',
  },
  root: {
    width: '100%',
    minWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
  listLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function BaseAppMenu(): JSX.Element {
  const isMenuOpen = useSelector(getIsMenuOpen);
  const isTravelListOpen = useSelector(getIsTravelListOpen);
  const currentPage = useSelector(getCurrentPage);

  const dispatch = useDispatch();
  const classes = useStyles(undefined);

  const handleMenuClose = useMemo(() => {
    return () => {
      dispatch(toggleMenu());
    };
  }, []);

  const handleTravelListToggle = useMemo(() => {
    return () => {
      dispatch(toggleTravelList());
    };
  }, []);

  return (
    <Drawer open={isMenuOpen} onClose={handleMenuClose}>
      <List className={classes.root}>
        <Link href="/" page="home">
          <a className={classes.listLink}>
            <ListItem button selected={currentPage === 'home'}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </a>
        </Link>

        <ListItem
          button
          onClick={handleTravelListToggle}
          selected={currentPage === 'trip'}
        >
          <ListItemIcon>
            <CardTravelIcon />
          </ListItemIcon>
          <ListItemText primary="Trips" />
          {isTravelListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        <Collapse in={isTravelListOpen}>
          <List disablePadding>
            <Link href="/new-trip" page="newTrip">
              <a className={classes.listLink}>
                <ListItem
                  key="add-new"
                  button
                  selected={currentPage === 'newTrip'}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText>Add new...</ListItemText>
                </ListItem>
              </a>
            </Link>
            {getTravelList()}
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        <ListItem button selected={currentPage === 'settings'}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
}

function getTravelList(): JSX.Element[] {
  return ['San Francisco', 'Bangkok', 'Stockholm'].map((text, i) => (
    <ListItem key={i} button>
      <ListItemText inset primary={text} />
    </ListItem>
  ));
}

export const AppMenu = withTranslation('title')(BaseAppMenu);
