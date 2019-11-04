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
import { WithTranslation } from 'react-i18next';
import { withTranslation } from '../utils/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu, toggleTravelList } from '../store/actions/ui';
import {
  getIsMenuOpen,
  getIsTravelListOpen,
  getCurrentPage,
  getTrips,
} from '../store/selectors';
import { Link } from './link';
import { Page, Trip } from '../store/model';

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

interface LinkItemProps {
  page: Page;
  currentPage: Page;
  href: string;
  primary: string;
  icon: JSX.Element;
}

function BaseAppMenu({ t }: WithTranslation): JSX.Element {
  const isMenuOpen = useSelector(getIsMenuOpen);
  const isTravelListOpen = useSelector(getIsTravelListOpen);
  const currentPage = useSelector(getCurrentPage);
  const trips = useSelector(getTrips);

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
        <LinkItem
          href="/"
          page="home"
          currentPage={currentPage}
          primary={t('home')}
          icon={<HomeIcon />}
        />

        <ListItem
          button
          onClick={handleTravelListToggle}
          selected={currentPage === 'trip'}
        >
          <ListItemIcon>
            <CardTravelIcon />
          </ListItemIcon>
          <ListItemText primary={t('trips')} />
          {isTravelListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        <Collapse in={isTravelListOpen}>
          <List disablePadding>
            <LinkItem
              href="/new-trip"
              page="newTrip"
              currentPage={currentPage}
              primary={t('addNew')}
              icon={<AddIcon />}
            />

            {getTripList(trips)}
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        <LinkItem
          href="/settings"
          page="settings"
          currentPage={currentPage}
          primary={t('settings')}
          icon={<SettingsIcon />}
        />
      </List>
    </Drawer>
  );
}

function LinkItem({
  href,
  page,
  currentPage,
  primary,
  icon,
}: LinkItemProps): JSX.Element {
  const classes = useStyles(undefined);

  return (
    <Link href={href} page={page}>
      <a className={classes.listLink}>
        <ListItem button selected={currentPage === page}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </a>
    </Link>
  );
}

function getTripList(trips: Trip[]): JSX.Element[] {
  return trips.map(trip => (
    <ListItem key={trip.id} button>
      <ListItemText inset primary={trip.name} />
    </ListItem>
  ));
}

export const AppMenu = withTranslation('app-menu')(BaseAppMenu);
