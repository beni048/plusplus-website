'use client';

import { Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAnalytics } from '@/hooks/use-analytics';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();
  const { trackCustomEvent, trackExternalLink } = useAnalytics();

  // Handler for privacy policy link click
  const handlePrivacyPolicyClick = () => {
    trackCustomEvent('click_footer_link', 'footer_navigation', {
      component_id: 'footer_privacy_policy_link',
      component_type: 'footer_link',
      link_type: 'privacy_policy',
      destination: 'privacy_policy_page',
      destination_path: `/${locale}/privacy-policy`,
      current_page: pathname,
      navigation_context: 'footer_navigation',
      legal_navigation: true
    });
  };

  // Handler for privacy settings link click
  const handlePrivacySettingsClick = () => {
    trackCustomEvent('click_footer_link', 'footer_navigation', {
      component_id: 'footer_privacy_settings_link',
      component_type: 'footer_link',
      link_type: 'privacy_settings',
      destination: 'privacy_settings_page',
      destination_path: `/${locale}/privacy-settings`,
      current_page: pathname,
      navigation_context: 'footer_navigation',
      privacy_management: true
    });
  };

  // Handler for LinkedIn link click
  const handleLinkedInClick = () => {
    const linkedinUrl = 'https://linkedin.com/company/plusplusag';
    
    // Use enhanced external link tracking
    trackExternalLink(linkedinUrl, 'LinkedIn Company Page', 'footer_linkedin_link');
    
    // Additional social media specific tracking
    trackCustomEvent('click_social_media', 'footer_navigation', {
      component_id: 'footer_linkedin_link',
      component_type: 'social_link',
      platform: 'linkedin',
      link_type: 'social_media',
      destination: 'linkedin_company_page',
      social_engagement: true,
      current_page: pathname,
      navigation_context: 'footer_social'
    });
  };

  // Language change callback for footer language switcher
  const handleLanguageChange = (previousLang: string, newLang: string) => {
    trackCustomEvent('change_language', 'internationalization', {
      component_id: 'footer_language_switcher',
      component_type: 'language_switcher',
      previous_language: previousLang,
      new_language: newLang,
      source_context: 'footer',
      device_context: 'mobile',
      current_page: pathname,
      language_preference_change: true
    });
  };

  return (
    <footer className="bg-black py-12 text-neutral-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <p className="text-lg">{t('copyright')}</p>
            <div className="flex space-x-4">
              <Link
                href={`/${locale}/privacy-policy`}
                className="text-sm text-neutral-white transition-colors hover:text-accent-orange underline"
                onClick={handlePrivacyPolicyClick}
              >
                {t('privacy')}
              </Link>
              <Link
                href={`/${locale}/privacy-settings`}
                className="text-sm text-neutral-white transition-colors hover:text-accent-orange underline"
                onClick={handlePrivacySettingsClick}
              >
                {t('privacySettings')}
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 md:items-end">
            <a
              href="https://linkedin.com/company/plusplusag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-neutral-white transition-colors hover:text-accent-orange"
              onClick={handleLinkedInClick}
            >
              <Mail className="h-6 w-6" />
              <span className="text-lg">{t('linkedin')}</span>
            </a>
            {/* Mobile language switcher - always visible on mobile */}
            <div className="block sm:hidden">
              <LanguageSwitcher mobile onLanguageChange={handleLanguageChange} sourceContext="footer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
