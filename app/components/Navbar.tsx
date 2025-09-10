'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href={`/${locale}`} 
            className="flex items-center"
            onClick={closeMobileMenu}
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
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              href={`/${locale}/help`} 
              className="text-black hover:text-accent-orange font-medium transition-colors"
            >
              {t('rentalSolutions')}
            </Link>
            <Link 
              href={`/${locale}/help`} 
              className="text-black hover:text-accent-orange font-medium transition-colors"
            >
              {t('corporateTreasury')}
            </Link>
            <Link 
              href={`/${locale}/help`} 
              className="text-black hover:text-accent-orange font-medium transition-colors"
            >
              {t('downloads')}
            </Link>
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-black hover:text-accent-orange transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <Link 
                href={`/${locale}/help`} 
                className="block text-black hover:text-accent-orange font-medium transition-colors py-2"
                onClick={closeMobileMenu}
              >
                {t('rentalSolutions')}
              </Link>
              <Link 
                href={`/${locale}/help`} 
                className="block text-black hover:text-accent-orange font-medium transition-colors py-2"
                onClick={closeMobileMenu}
              >
                {t('corporateTreasury')}
              </Link>
              <Link 
                href={`/${locale}/help`} 
                className="block text-black hover:text-accent-orange font-medium transition-colors py-2"
                onClick={closeMobileMenu}
              >
                {t('downloads')}
              </Link>
              <Link 
                href={`/${locale}/help`} 
                className="block text-black hover:text-accent-orange font-medium transition-colors py-2"
                onClick={closeMobileMenu}
              >
                {t('help')}
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <LanguageSwitcher sourceContext="navbar" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
