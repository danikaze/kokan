import { PageComponent } from '../interfaces';
import { Container, TextField, Button, Snackbar } from '@material-ui/core';
import { withTranslation } from '../utils/i18n';
import { withRedux } from '../store/with-redux';
import { AppTitle } from '../components/app-title';
import { AppMenu } from '../components/app-menu';
import { PageTitle } from '../components/page-title';
import { useDispatch } from 'react-redux';
import { addNewTrip } from '../store/actions/trips';
import { createRef, useState } from 'react';
import { snackBarDuration as SNACKBAR_DURATION } from '../constants/app';

function useNewTripForm() {
  let valid = true;
  const dispatch = useDispatch();
  const nameRef = createRef<HTMLInputElement>();
  const [nameError, setNameError] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const validateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    valid = event.target.value.length > 0;
    setNameError(!valid);
  };

  const saveTrip = (event?: React.FormEvent) => {
    event.preventDefault();
    validateName({ target: nameRef.current } as React.ChangeEvent<
      HTMLInputElement
    >);
    if (!valid) {
      return;
    }
    dispatch(addNewTrip(nameRef.current.value));
    nameRef.current.value = '';
    setShowSnackBar(true);
  };

  const hideSnackbar = () => {
    setShowSnackBar(false);
  };

  return {
    nameRef,
    nameError,
    validateName,
    saveTrip,
    showSnackBar,
    hideSnackbar,
  };
}

/**
 * Add New Trip Page
 */
const NewTripPage: PageComponent = function NewTripPage({ t }) {
  const {
    nameRef,
    nameError,
    validateName,
    saveTrip,
    showSnackBar,
    hideSnackbar,
  } = useNewTripForm();

  return (
    <>
      <AppTitle />
      <AppMenu />

      <Container>
        <PageTitle>{t('pageTitle')}</PageTitle>

        <form autoComplete="off" onSubmit={saveTrip}>
          <TextField
            inputRef={nameRef}
            onChange={validateName}
            error={nameError}
            required
            fullWidth
            label={t('tripName')}
            margin="normal"
          />
        </form>

        <Button onClick={saveTrip} variant="contained">
          {t('addButton')}
        </Button>

        <Snackbar
          open={showSnackBar}
          onClose={hideSnackbar}
          autoHideDuration={SNACKBAR_DURATION}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">{t('addedFeedback')}</span>}
        />
      </Container>
    </>
  );
};

export default withRedux(withTranslation('page-new-trip')(
  NewTripPage
) as undefined);
