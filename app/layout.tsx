import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsentBanner from "./components/CookieConsent";

export const metadata: Metadata = {
  title: "Plusplus - Bridging TradFi and DeFi",
  description:
    "Plusplus empowers Swiss institutions with secure, compliant DeFi solutions. We simplify decentralized finance integration for banks, asset managers, and enterprises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
          <Navbar />
          {children}
          <Footer />
          <CookieConsentBanner />
      </body>
    </html>
  );
}
