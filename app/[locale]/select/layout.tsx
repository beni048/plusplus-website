import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Choose Your Solution - Rental or Corporate Treasury",
    de: "Wählen Sie Ihre Lösung - Mietkaution oder Corporate Treasury",
  };

  const descriptions = {
    en: "Explore Plusplus solutions for rental deposits and corporate treasury management. Find the perfect fit for your needs.",
    de: "Entdecken Sie Plusplus Lösungen für Mietkautionen und Corporate Treasury Management. Finden Sie die perfekte Lösung für Ihre Bedürfnisse.",
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

export default function SelectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
