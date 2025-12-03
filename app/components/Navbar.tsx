'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

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
          <div className="hidden lg:flex items-center">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {/* <Link
                href={`/${locale}/rental-solutions/select`}
                className={`font-primary font-medium transition-colors ${
                  isActive(`/${locale}/rental-solutions/select`)
                    ? 'text-accent-red'
                    : 'text-black hover:text-accent-red'
                }`}
              >
                {t('rentalSolutions')}
              </Link> */}
              <Link
                href={`/${locale}/corporate-treasury`}
                className={`font-primary font-medium transition-colors ${isActive(`/${locale}/corporate-treasury`)
                  ? 'text-accent-red'
                  : 'text-black hover:text-accent-red'
                  }`}
              >
                {t('corporateTreasury')}
              </Link>
              <Link
                href={`/${locale}/about-us`}
                className={`font-primary font-medium transition-colors ${isActive(`/${locale}/about-us`)
                  ? 'text-accent-red'
                  : 'text-black hover:text-accent-red'
                  }`}
              >
                {t('aboutUs')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className={`font-primary font-medium transition-colors ${isActive(`/${locale}/contact`)
                  ? 'text-accent-red'
                  : 'text-black hover:text-accent-red'
                  }`}
              >
                {t('contact')}
              </Link>
              <Link
                href={`/${locale}/contract-query`}
                className={`font-primary font-medium transition-colors ${isActive(`/${locale}/contract-query`)
                  ? 'text-accent-red'
                  : 'text-black hover:text-accent-red'
                  }`}
              >
                {t('checkBalance')}
              </Link>
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-300 mx-6"></div>

            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher sourceContext="navbar" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-black hover:text-accent-red transition-colors"
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
              {/* <Link
                href={`/${locale}/rental-solutions/select`}
                className={`block font-primary font-medium transition-colors py-2 ${
                  isActive(`/${locale}/rental-solutions/select`)
                    ? 'text-accent-red'
                    : 'text-black hover:text-accent-red'
                }`}
                onClick={closeMobileMenu}
              >
                {t('rentalSolutions')}
              </Link> */}
              <Link
                href={`/${locale}/corporate-treasury`}
                className={`block font-primary font-medium transition-colors py-2 ${isActive(`/${locale}/corporate-treasury`)
                  ? 'text-accent-red'
                  : 'text-black hover:text-accent-red'
                  }`}
                onClick={closeMobileMenu}
              >
                {t('corporateTreasury')}
              </Link>
              <Link
                href={`/${locale}/about-us`}
                className={`block font-primary font-medium transition-colors py-2 ${isActive(`/${locale}/about-us`)
                  ? 'text-accent-red'
                  : 'text-black hover:text-accent-red'
                  }`}
                onClick={closeMobileMenu}
              >
                {t('aboutUs')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className={`block font-primary font-medium transition-colors py-2 ${isActive(`/${locale}/contact`)
                  ? 'text-accent-red'
                  : 'text-black hover:text-accent-red'
                  }`}
                onClick={closeMobileMenu}
              >
                {t('contact')}
              </Link>
              <Link
                href={`/${locale}/contract-query`}
                className={`block font-primary font-medium transition-colors py-2 ${isActive(`/${locale}/contract-query`)
                  ? 'text-accent-red'
                  : 'text-black hover:text-accent-red'
                  }`}
                onClick={closeMobileMenu}
              >
                {t('checkBalance')}
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <LanguageSwitcher sourceContext="navbar" mobile />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
