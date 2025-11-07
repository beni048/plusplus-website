import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Landlord Rental Deposit Management - Digital Solutions",
    de: "Vermieter Mietkaution Management - Digitale Lösungen",
  };

  const descriptions = {
    en: "Streamlined digital rental deposit management for landlords. Secure setup, automated processes, and integration with property management software.",
    de: "Vereinfachtes digitales Mietkaution Management für Vermieter. Sichere Einrichtung, automatisierte Prozesse und Integration mit Verwaltungssoftware.",
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

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
