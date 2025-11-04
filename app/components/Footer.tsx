'use client';

import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-black py-12 text-neutral-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0">
          {/* Left side on desktop, centered stack on mobile - Links and Copyright */}
          <div className="flex flex-col space-y-3 items-center lg:items-start">
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-sm">
              <Link
                href={`/${locale}/privacy-policy`}
                className="text-neutral-white transition-colors hover:text-accent-red underline font-secondary"
              >
                {t('privacyPolicy')}
              </Link>
              <span className="text-neutral-medium">|</span>
              <Link
                href={`/${locale}/privacy-settings`}
                className="text-neutral-white transition-colors hover:text-accent-red underline font-secondary"
              >
                {t('privacySettings')}
              </Link>
              <span className="text-neutral-medium">|</span>
              <Link
                href={`/${locale}/imprint`}
                className="text-neutral-white transition-colors hover:text-accent-red underline font-secondary"
              >
                {t('impressum')}
              </Link>
              <span className="text-neutral-medium">|</span>
              <Link
                href={`/${locale}/terms-and-conditions`}
                className="text-neutral-white transition-colors hover:text-accent-red underline font-secondary"
              >
                {t('terms')}
              </Link>
            </div>
            <div className="text-sm text-neutral-medium font-secondary text-center lg:text-left">
              <p>{t('copyright')}</p>
            </div>
          </div>

          {/* Right side on desktop, bottom on mobile - LinkedIn */}
          <div className="flex items-center lg:mt-0">
            <a
              href="https://linkedin.com/company/plusplusag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-white transition-colors hover:text-accent-red"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
