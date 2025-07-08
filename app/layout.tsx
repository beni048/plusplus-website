import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plusplus - Bridging TradFi and DeFi",
  description:
    "Plusplus empowers Swiss institutions and tenants with secure, compliant DeFi solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}