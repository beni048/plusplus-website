import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Imprint | Plusplus",
  description: "Legal information and contact details for Plusplus AG, a Swiss fintech company.",
  openGraph: {
    title: "Imprint | Plusplus",
    description: "Legal information about Plusplus AG.",
    type: "website",
  },
};

export default function ImprintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
