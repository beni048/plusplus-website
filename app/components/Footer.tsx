'use client';

import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-primary-navy py-12 text-neutral-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <p className="text-lg">{t('copyright')}</p>
            <Link
              href={`/${locale}/privacy-policy`}
              className="text-sm text-neutral-white transition-colors hover:text-primary-teal underline"
            >
              {t('privacy')}
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4 md:items-end">
            <a
              href="https://linkedin.com/company/plusplusag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-neutral-white transition-colors hover:text-primary-teal"
            >
              <Mail className="h-6 w-6" />
              <span className="text-lg">{t('linkedin')}</span>
            </a>
            {/* Mobile language switcher - always visible on mobile */}
            <div className="block sm:hidden">
              <LanguageSwitcher mobile />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
