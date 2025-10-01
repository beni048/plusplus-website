"use client";

import { useTranslations } from 'next-intl';
import PrivacyControls from '@/app/components/PrivacyControls';

export default function PrivacySettingsPage() {
  const t = useTranslations('privacy');

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-3xl sm:text-4xl lg:text-5xl font-primary font-medium text-black px-4">
            {t('controlsTitle')}
          </h1>
          
          <div className="text-center mb-12 px-4">
            <p className="font-secondary leading-relaxed text-neutral-dark max-w-3xl mx-auto text-justify">
              {t('pageSubtitle')}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <PrivacyControls />
          </div>

          <div className="prose prose-lg max-w-none text-neutral-dark">
            <h2 className="text-2xl font-primary font-semibold text-black mb-4 mt-8">
              {t('aboutAnalyticsTitle')}
            </h2>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('aboutAnalyticsDescription')}
            </p>
            <ul className="font-secondary leading-relaxed mb-8 ml-6 list-disc space-y-3">
              <li className="text-justify"><strong className="text-black font-primary">{t('consentModeLabel')}:</strong> {t('consentModeFeature')}</li>
              <li className="text-justify"><strong className="text-black font-primary">{t('ipAnonymizationLabel')}:</strong> {t('ipAnonymizationFeature')}</li>
              <li className="text-justify"><strong className="text-black font-primary">{t('noAdvertisingLabel')}:</strong> {t('noAdvertisingFeature')}</li>
              <li className="text-justify"><strong className="text-black font-primary">{t('dataRetentionLabel')}:</strong> {t('dataRetentionFeature')}</li>
              <li className="text-justify"><strong className="text-black font-primary">{t('gdprComplianceLabel')}:</strong> {t('gdprComplianceFeature')}</li>
            </ul>
            <p className="font-secondary leading-relaxed mb-6 text-justify">
              {t('optOutInfo')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
