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

  // Show current language
  const currentLabel = locale === 'en' ? 'EN' : 'DE';
  const otherLocale = locale === 'en' ? 'de' : 'en';
  const otherLabel = locale === 'en' ? 'DE' : 'EN';

  // For mobile menu, show a simple toggle button instead of dropdown
  if (sourceContext === 'navbar' && mobile) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchToLocale(otherLocale)}
        className="w-full justify-start text-black hover:text-accent-orange hover:bg-transparent font-primary font-medium transition-colors text-base p-0 h-auto"
      >
        {currentLabel}
      </Button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`${mobile ? 'w-full justify-start text-neutral-white hover:text-accent-orange' : 'text-black hover:text-accent-orange'} hover:bg-transparent font-primary font-medium transition-colors text-base p-0 h-auto`}
      >
        {currentLabel}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[80px] right-0">
          <button
            onClick={() => switchToLocale(otherLocale)}
            className="w-full px-4 py-2 text-center text-black hover:bg-gray-50 hover:text-accent-orange font-primary font-medium transition-colors text-base"
          >
            {otherLabel}
          </button>
        </div>
      )}
    </div>
  );
}