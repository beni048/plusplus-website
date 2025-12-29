import createProxy from 'next-intl/middleware';

export const proxy = createProxy({
  locales: ['en', 'de', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always' // Ensure locale is always present
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
