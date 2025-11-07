import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Tenant Rental Deposits - Frankencoin & Bitcoin Solutions",
    de: "Mieter Mietkaution - Frankencoin & Bitcoin Lösungen",
  };

  const descriptions = {
    en: "Modern rental deposit solutions for tenants in Switzerland. Choose from Frankencoin stablecoin, Bitcoin, or deposit insurance with yield potential.",
    de: "Moderne Mietkaution Lösungen für Mieter in der Schweiz. Wählen Sie zwischen Frankencoin-Stablecoin, Bitcoin oder Kautionsversicherung mit Rendite.",
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

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  // server layout - simple pass-through, used to export metadata server-side
  return <>{children}</>;
}
