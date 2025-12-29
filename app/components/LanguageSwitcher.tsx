'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useAnalytics } from '@/hooks/use-analytics';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from 'react';

interface LanguageSwitcherProps {
  mobile?: boolean;
  onLanguageChange?: (previousLang: string, newLang: string) => void;
  sourceContext?: 'navbar' | 'footer' | 'mobile';
}

export default function LanguageSwitcher({
  mobile = false,
  sourceContext
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { trackLanguageSwitch } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const supportedLocales = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'fr', label: 'FR' }
  ];

  const currentLang = supportedLocales.find(l => l.code === locale) || supportedLocales[0];
  const otherLangs = supportedLocales.filter(l => l.code !== locale);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switchToLocale = (newLocale: string) => {
    trackLanguageSwitch(newLocale);

    // Remove the current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';

    // Create new path with the target locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
    setIsOpen(false);
  };


  // For mobile menu, show all languages as separate buttons
  if (sourceContext === 'navbar' && mobile) {
    return (
      <div className="flex items-center space-x-4">
        {supportedLocales.map((lang) => (
          <Button
            key={lang.code}
            variant="ghost"
            size="sm"
            onClick={() => switchToLocale(lang.code)}
            className={`justify-start font-primary font-medium transition-colors text-base p-0 h-auto ${currentLang.code === lang.code
              ? 'text-accent-red font-bold'
              : 'text-black hover:text-accent-red'
              }`}
          >
            {lang.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`${mobile ? 'w-full justify-start text-neutral-white hover:text-accent-red' : 'text-black hover:text-accent-red'} hover:bg-transparent font-primary font-medium transition-colors text-base p-0 h-auto`}
      >
        {currentLang.label}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[80px] right-0">
          {otherLangs.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchToLocale(lang.code)}
              className="w-full px-4 py-2 text-center text-black hover:bg-gray-50 hover:text-accent-red font-primary font-medium transition-colors text-base"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}