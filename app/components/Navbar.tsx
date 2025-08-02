'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAnalytics } from '@/hooks/use-analytics';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { trackCustomEvent } = useAnalytics();

  // Handler for logo click tracking
  const handleLogoClick = () => {
    trackCustomEvent('click_logo', 'navigation', {
      component_id: 'navbar_logo',
      component_type: 'logo_link',
      destination: 'homepage',
      destination_path: `/${locale}`,
      current_page: pathname,
      navigation_context: 'header_navigation',
      brand_engagement: true,
      return_to_home: true
    });
  };

  // Handler for help link click tracking
  const handleHelpLinkClick = () => {
    trackCustomEvent('click_nav_item', 'navigation', {
      component_id: 'navbar_help_link',
      component_type: 'nav_link',
      nav_item: 'help',
      destination: 'help_page',
      destination_path: `/${locale}/help`,
      current_page: pathname,
      navigation_context: 'header_navigation',
      support_engagement: true
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href={`/${locale}`} 
            className="flex items-center"
            onClick={handleLogoClick}
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
              onClick={handleHelpLinkClick}
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
