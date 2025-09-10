import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsentBanner from '../components/CookieConsent';
import GoogleAnalytics from '../components/GoogleAnalytics';
import ScrollToTop from '../components/ScrollToTop';

const locales = ['en', 'de'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
      <GoogleAnalytics />
      <Navbar />
      {children}
      <Footer />
      <CookieConsentBanner />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}