import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsentBanner from '../components/CookieConsent';
import GoogleAnalytics from '../components/GoogleAnalytics';
import ScrollToTop from '../components/ScrollToTop';
import ClientProviders from '../ClientProviders';

const locales = ['en', 'de'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Plusplus - Stablecoin Partner Switzerland",
  description: "Swiss DeFi solutions for rental deposits and treasury management",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Do not leave debug logs in production server components
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages({ locale }); // ← Pass locale explicitly

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <GoogleAnalytics />
      <ClientProviders>
        <Navbar />
        {children}
        <Footer />
        <CookieConsentBanner />
        <ScrollToTop />
      </ClientProviders>
    </NextIntlClientProvider>
  );
}