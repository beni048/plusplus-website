import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Corporate Treasury Solutions - Frankencoin & Plusplus Trust",
    de: "Corporate Treasury Lösungen - Frankencoin & Plusplus Trust",
  };

  const descriptions = {
    en: "Institutional-grade custody and treasury management with Frankencoin stablecoin and Plusplus Trust. Fully regulated, audited by ChainSecurity.",
    de: "Institutionelle Verwahrung und Treasury Management mit Frankencoin-Stablecoin und Plusplus Trust. Vollständig reguliert, von ChainSecurity geprüft.",
  };

  const locale_key = locale as keyof typeof titles;

  return {
    title: titles[locale_key] || titles.en,
    description: descriptions[locale_key] || descriptions.en,
    openGraph: {
      title: titles[locale_key] || titles.en,
      description: descriptions[locale_key] || descriptions.en,
      type: "website",
      locale: locale === "de" ? "de_CH" : "en_GB",
      alternateLocale: locale === "de" ? "en_GB" : "de_CH",
    },
  };
}

export default function CorporateTreasuryLayout({ children }: { children: React.ReactNode }) {
  // Server-side layout: pass-through wrapper that provides route-specific metadata
  return <>{children}</>;
}
