import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plusplus - Bridging TradFi and DeFi",
  description:
    "Plusplus empowers Swiss institutions and tenants with secure, compliant DeFi solutions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://plusplus.ch'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'de': '/de',
    },
  },
  openGraph: {
    title: "Plusplus - Bridging TradFi and DeFi",
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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}