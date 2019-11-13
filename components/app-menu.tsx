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
  tripId?: number;
  currentPage: Page;
  selectedTripId?: number;
  href: string;
  as?: string;
  primary: string;
  icon?: JSX.Element;
  inset?: boolean;
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
          currentPage={currentPage.page}
          primary={t('home')}
          icon={<HomeIcon />}
        />

        <LinkItem
          href="/trip/new"
          page="newTrip"
          currentPage={currentPage.page}
          primary={t('addNew')}
          icon={<AddIcon />}
        />

        <ListItem button onClick={handleTravelListToggle}>
          <ListItemIcon>
            <CardTravelIcon />
          </ListItemIcon>
          <ListItemText primary={t('trips')} />
          {isTravelListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        <Collapse in={isTravelListOpen}>
          <List disablePadding>
            {getTripList(trips, currentPage.page, currentPage.tripId)}
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        <LinkItem
          href="/settings"
          page="settings"
          currentPage={currentPage.page}
          primary={t('settings')}
          icon={<SettingsIcon />}
        />
      </List>
    </Drawer>
  );
}

function LinkItem({
  href,
  as,
  page,
  currentPage,
  selectedTripId,
  tripId,
  primary,
  icon,
  inset,
}: LinkItemProps): JSX.Element {
  const classes = useStyles(undefined);
  const iconElem = icon && <ListItemIcon>{icon}</ListItemIcon>;
  const isSelected =
    currentPage === page && (!tripId || tripId === selectedTripId);

  return (
    <Link href={href} as={as} page={page} tripId={tripId}>
      <a className={classes.listLink}>
        <ListItem button selected={isSelected}>
          {iconElem}
          <ListItemText inset={inset} primary={primary} />
        </ListItem>
      </a>
    </Link>
  );
}

function getTripList(
  trips: Trip[],
  currentPage: Page,
  selectedTripId: number
): JSX.Element[] {
  return trips.map(trip => (
    <LinkItem
      key={trip.id}
      href={`/trip/[id]`}
      as={`/trip/${trip.id}`}
      page="trip"
      currentPage={currentPage}
      selectedTripId={selectedTripId}
      tripId={trip.id}
      primary={trip.name}
      inset
    />
  ));
}

export const AppMenu = withTranslation('app-menu')(BaseAppMenu);
