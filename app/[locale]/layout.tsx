import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsentBanner from '../components/CookieConsent';

const locales = ['en', 'de'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log('Locale Layout - Current locale:', locale); // Debug log
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    console.log('Invalid locale:', locale); // Debug log
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages({ locale }); // ← Pass locale explicitly

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar />
      {children}
      <Footer />
      <CookieConsentBanner />
    </NextIntlClientProvider>
  );
}