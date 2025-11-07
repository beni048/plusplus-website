import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Plusplus",
  description: "Learn how Plusplus AG collects, uses, and protects your personal data in compliance with Swiss and GDPR regulations.",
  openGraph: {
    title: "Privacy Policy | Plusplus",
    description: "Our commitment to your data privacy and security.",
    type: "website",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
