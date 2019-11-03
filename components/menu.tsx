import { Drawer, List, ListItem, makeStyles } from '@material-ui/core';
import { withTranslation } from '../utils/i18n';
import { State } from '../store/model';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../store/actions/ui';
const useStyles = makeStyles({
  menuList: {
    width: 'auto',
  },
  listItem: {
    minWidth: '250px',
  },
});

function BaseMenu(): JSX.Element {
  const isOpen = useSelector((state: State) => state.ui.menuOpen);
  const dispatch = useDispatch();
  const classes = useStyles(undefined);

  function handleMenuClose() {
    dispatch(toggleMenu());
  }

  return (
    <Drawer open={isOpen} onClose={handleMenuClose}>
      <List>
        <ListItem button className={classes.listItem}>
          Item 1
        </ListItem>
        <ListItem button className={classes.listItem}>
          Item 2
        </ListItem>
        <ListItem button className={classes.listItem}>
          Item 3
        </ListItem>
      </List>
    </Drawer>
  );
}

export const Menu = withTranslation('title')(BaseMenu);
