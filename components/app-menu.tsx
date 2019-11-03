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

const useStyles = makeStyles(theme => ({
  menuList: {
    width: 'auto',
  },
  root: {
    width: '100%',
    minWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
}));

function BaseAppMenu(): JSX.Element {
  const isMenuOpen = useSelector(getIsMenuOpen);
  const isTravelListOpen = useSelector(getIsTravelListOpen);
  const currentPage = useSelector(getCurrentPage);

  const dispatch = useDispatch();
  const classes = useStyles(undefined);

  function handleMenuClose() {
    dispatch(toggleMenu());
  }

  function handleTravelListToggle() {
    dispatch(toggleTravelList());
  }

  return (
    <Drawer open={isMenuOpen} onClose={handleMenuClose}>
      <List className={classes.root}>
        <ListItem button selected={currentPage === 'home'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

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
            <ListItem key="add-new" button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create new..." />
            </ListItem>
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
