import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Mulish } from "next/font/google";
import Script from 'next/script';
import { Web3Provider } from "@/components/Web3Provider";

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
    "Your Partner for Stablecoins. Plusplus empowers Swiss institutions and tenants with secure, compliant DeFi solutions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.plusplus.swiss'),
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
        '@id': 'https://www.plusplus.swiss/#organization',
        name: 'Plusplus AG',
        url: 'https://www.plusplus.swiss',
        logo: 'https://www.plusplus.swiss/logo.svg',
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
        '@id': 'https://www.plusplus.swiss/#business',
        name: 'Plusplus AG',
        url: 'https://www.plusplus.swiss',
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WB7JJTSK');`
          }}
        />
        {/* End Google Tag Manager */}
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>
      <body className={`${outfit.variable} ${mulish.variable} font-sans`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WB7JJTSK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}