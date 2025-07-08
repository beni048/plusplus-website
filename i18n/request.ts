import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'de'];

export default getRequestConfig(async ({locale}) => {
  // If locale is undefined or invalid, default to 'en'
  const validLocale = locale && locales.includes(locale) ? locale : 'en';
  
  return {
    locale: validLocale, // ← Add this line!
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});