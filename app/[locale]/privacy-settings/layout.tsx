import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Settings | Plusplus",
  description: "Manage your privacy preferences and control how your data is used on Plusplus services.",
  openGraph: {
    title: "Privacy Settings | Plusplus",
    description: "Control your privacy settings.",
    type: "website",
  },
};

export default function PrivacySettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
