import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
    </html>
  );
}
