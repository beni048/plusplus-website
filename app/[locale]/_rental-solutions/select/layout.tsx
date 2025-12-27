import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Rental Solutions - Tenant or Landlord",
    de: "Mietlösungen - Mieter oder Vermieter",
  };

  const descriptions = {
    en: "Choose your role: Tenant seeking deposit solutions or Landlord managing deposits. Flexible options for both sides.",
    de: "Wählen Sie Ihre Rolle: Mieter mit Kautionslösungen oder Vermieter, der Kautionen verwaltet. Flexible Optionen für beide Seiten.",
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

export default function RentalSolutionsSelectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
