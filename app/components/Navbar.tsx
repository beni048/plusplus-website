'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href={`/${locale}`} 
            className="flex items-center"
          >
            <Image
              src="/images/logo_plusplus.png"
              alt="Plusplus"
              width={240}
              height={80}
              className="h-8 w-auto object-contain"
              priority
              quality={100}
            />
          </Link>
          <div className="flex items-center space-x-6">
            <Link 
              href={`/${locale}/help`} 
              className="text-black hover:text-accent-orange font-medium transition-colors"
            >
              {t('help')}
            </Link>
            <div className="hidden sm:block">
              <LanguageSwitcher sourceContext="navbar" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
