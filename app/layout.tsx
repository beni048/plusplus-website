import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Mulish } from "next/font/google";
import Script from 'next/script';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
  weight: ['400', '500', '600', '700', '800', '900'],
});

const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Plusplus - Stablecoin Partner Switzerland",
  description:
    "Plusplus empowers Swiss institutions and tenants with secure, compliant DeFi solutions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://plusplus.swiss'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'de': '/de',
    },
  },
  openGraph: {
    title: "Plusplus - Stablecoin Partner Switzerland",
    description: "Plusplus empowers Swiss institutions and tenants with secure, compliant DeFi solutions.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization and LocalBusiness schema for Plusplus
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://plusplus.swiss/#organization',
        name: 'Plusplus AG',
        url: 'https://plusplus.swiss',
        logo: 'https://plusplus.swiss/logo.svg',
        description: 'Swiss fintech company providing DeFi solutions for rental deposits and treasury management',
        sameAs: [],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Poststrasse 22',
          addressLocality: 'Zug',
          postalCode: '6300',
          addressCountry: 'CH'
        },
        email: 'info@plusplus.swiss',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'info@plusplus.swiss'
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://plusplus.swiss/#business',
        name: 'Plusplus AG',
        url: 'https://plusplus.swiss',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Poststrasse 22',
          addressLocality: 'Zug',
          postalCode: '6300',
          addressCountry: 'CH'
        },
        telephone: '+41 XX XXX XX XX',
        email: 'info@plusplus.swiss',
        priceRange: 'CHF',
        description: 'Swiss DeFi solutions for rental deposits and treasury management'
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>
      <body className={`${outfit.variable} ${mulish.variable} font-sans`}>{children}</body>
    </html>
  );
}