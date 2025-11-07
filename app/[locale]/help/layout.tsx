import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Plusplus",
  description: "Find answers to common questions about Plusplus DeFi solutions, security, regulations, and how our products work.",
  openGraph: {
    title: "Frequently Asked Questions | Plusplus",
    description: "Learn about Plusplus rental deposits and treasury solutions.",
    type: "website",
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
