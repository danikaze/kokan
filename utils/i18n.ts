import NextI18Next from 'next-i18next';

const nextI18NextInstance = new NextI18Next({
  // debug: true,
  lng: 'en',
  fallbackLng: 'en',
  defaultLanguage: 'en',
  otherLanguages: ['es'],
});

export const {
  appWithTranslation,
  withTranslation,
  Trans,
  i18n,
} = nextI18NextInstance;
