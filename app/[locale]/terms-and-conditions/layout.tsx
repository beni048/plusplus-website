import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms and Conditions | Plusplus",
  description: "Review the terms and conditions governing your use of Plusplus AG services and DeFi products.",
  openGraph: {
    title: "Terms and Conditions | Plusplus",
    description: "Legal terms for using Plusplus services.",
    type: "website",
  },
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
