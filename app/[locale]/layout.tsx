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

const locales = ['en', 'de', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Plusplus - Your Partner for Stablecoins",
    de: "Plusplus - Ihr Partner für Stablecoins",
    fr: "Plusplus - Votre partenaire pour les Stablecoins",
  };

  const descriptions = {
    en: "Secure, compliant DeFi solutions for Swiss rental deposits and corporate treasury management. Featuring Frankencoin stablecoin, Bitcoin, and deposit insurance.",
    de: "Sichere, konforme DeFi-Lösungen für Schweizer Mietkautionen und Corporate Treasury Management. Mit Frankencoin-Stablecoin, Bitcoin und Kautionsversicherung.",
    fr: "Solutions DeFi sécurisées et conformes pour les garanties de loyer suisses et la gestion de trésorerie d'entreprise. Avec Frankencoin, Bitcoin et assurance dépôt.",
  };

  const locale_key = locale as keyof typeof titles;

  const currentTitle = titles[locale_key] || titles.en;
  const currentDescription = descriptions[locale_key] || descriptions.en;

  const ogLocaleMap: Record<string, string> = {
    en: 'en_GB',
    de: 'de_CH',
    fr: 'fr_CH'
  };
  const currentOgLocale = ogLocaleMap[locale] || 'en_GB';
  const alternateOgLocales = Object.values(ogLocaleMap).filter(l => l !== currentOgLocale);

  return {
    title: currentTitle,
    description: currentDescription,
    openGraph: {
      title: currentTitle,
      description: currentDescription,
      type: 'website',
      locale: currentOgLocale,
      alternateLocale: alternateOgLocales,
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