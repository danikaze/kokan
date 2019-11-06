import { PageComponent } from '../interfaces';
import {
  Container,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { withTranslation } from '../utils/i18n';
import { withRedux } from '../store/with-redux';
import { AppTitle } from '../components/app-title';
import { AppMenu } from '../components/app-menu';
import { PageTitle } from '../components/page-title';
import { LANGUAGES } from '../constants/app';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, setSetting } from '../store/actions/settings';
import { getIsGpsAllowed, getLanguage } from '../store/selectors';
import { initPage } from '../utils/init-page';

const useSettings = () => {
  const dispatch = useDispatch();
  initPage(dispatch);

  return {
    lang: useSelector(getLanguage),
    gps: useSelector(getIsGpsAllowed),

    changeInput: (name: string) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;
      dispatch(setSetting(name, value));

      if (name === 'lang') {
        dispatch(setLanguage(value));
      }
    },
    changeCheckbox: (name: string) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let value = event.target.checked;
      if (name === 'gps') {
        if (!('geolocation' in navigator)) {
          value = false;
        }
        if (value) {
          navigator.geolocation.getCurrentPosition(() => {
            dispatch(setSetting(name, value));
          });
        }
        return;
      }

      dispatch(setSetting(name, value));
    },
  };
};

/**
 * Add New Trip Page
 */
const SettingsPage: PageComponent = ({ t }) => {
  const settings = useSettings();
  const gpsControl = (
    <Checkbox
      checked={settings.gps}
      onChange={settings.changeCheckbox('gps')}
      value="gps"
    />
  );

  return (
    <>
      <AppTitle />
      <AppMenu />

      <Container>
        <PageTitle>{t('pageTitle')}</PageTitle>
        <FormControl fullWidth>
          <FormControlLabel control={gpsControl} label={t('allowGps')} />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="lang-label">{t('language')}</InputLabel>
          <Select
            labelId="lang-label"
            id="lang"
            value={settings.lang}
            onChange={settings.changeInput('lang')}
          >
            {renderLangOptions()}
          </Select>
        </FormControl>
      </Container>
    </>
  );
};

function renderLangOptions(): JSX.Element[] {
  return Object.keys(LANGUAGES).map(lang => (
    <MenuItem key={lang} value={lang}>
      {LANGUAGES[lang]}
    </MenuItem>
  ));
}

export default withRedux(withTranslation('page-settings')(
  SettingsPage
) as undefined);
