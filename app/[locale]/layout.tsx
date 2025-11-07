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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Plusplus - Modern Rental Deposits & Corporate Treasury Solutions",
    de: "Plusplus - Moderne Mietkaution & Corporate Treasury Lösungen",
  };

  const descriptions = {
    en: "Secure, compliant DeFi solutions for Swiss rental deposits and corporate treasury management. Featuring Frankencoin stablecoin, Bitcoin, and deposit insurance.",
    de: "Sichere, konforme DeFi-Lösungen für Schweizer Mietkautionen und Corporate Treasury Management. Mit Frankencoin-Stablecoin, Bitcoin und Kautionsversicherung.",
  };

  const locale_key = locale as keyof typeof titles;

  return {
    title: titles[locale_key] || titles.en,
    description: descriptions[locale_key] || descriptions.en,
    openGraph: {
      title: titles[locale_key] || titles.en,
      description: descriptions[locale_key] || descriptions.en,
      type: 'website',
      locale: locale === 'de' ? 'de_CH' : 'en_GB',
      alternateLocale: locale === 'de' ? 'en_GB' : 'de_CH',
    },
  };
}

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