import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Get in Touch | Plusplus",
  description: "Contact Plusplus AG. We're here to help with your questions about our DeFi solutions for rental deposits and corporate treasury.",
  openGraph: {
    title: "Get in Touch | Plusplus",
    description: "Contact our Swiss DeFi team.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
