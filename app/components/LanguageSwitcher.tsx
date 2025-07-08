'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  mobile?: boolean;
}

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchToLocale = (newLocale: string) => {
    // Remove the current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Create new path with the target locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
  };

  // Show the language you can switch TO, not the current one
  const targetLocale = locale === 'en' ? 'de' : 'en';
  const targetLabel = locale === 'en' ? 'Deutsch' : 'English';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => switchToLocale(targetLocale)}
      className={`${mobile ? 'w-full justify-start text-neutral-white hover:text-primary-teal' : 'text-primary-navy hover:text-primary-teal'} hover:bg-transparent font-medium transition-colors`}
    >
      <Globe className="mr-2 h-4 w-4" />
      {targetLabel}
    </Button>
  );
}