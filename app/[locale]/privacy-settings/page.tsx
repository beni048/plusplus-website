"use client";

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/hooks/use-analytics';
import PrivacyControls from '@/app/components/PrivacyControls';

export default function PrivacySettingsPage() {
  const t = useTranslations('privacy');
  const { trackCustomEvent } = useAnalytics();

  useEffect(() => {
    // Track privacy settings page access for compliance
    trackCustomEvent('page_view', 'privacy_settings', {
      component_id: 'privacy_settings_page',
      component_type: 'settings_page',
      page_type: 'privacy_settings',
      privacy_management: true,
      compliance_tracking: true,
      access_timestamp: Date.now(),
      user_intent: 'manage_privacy_preferences'
    });

    // Track time spent on settings page
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime;
      trackCustomEvent('page_time_spent', 'privacy_settings', {
        component_id: 'privacy_settings_page',
        component_type: 'settings_page',
        time_spent_ms: timeSpent,
        time_spent_seconds: Math.round(timeSpent / 1000),
        settings_engagement: timeSpent > 30000 ? 'high' : timeSpent > 10000 ? 'medium' : 'low',
        compliance_metric: true
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackCustomEvent]);

  // Callback to track when settings are changed from this page
  const handleSettingChange = (settingType: string, settingValue: any, additionalContext?: any) => {
    trackCustomEvent('setting_change_from_page', 'privacy_settings', {
      component_id: 'privacy_settings_page_change',
      component_type: 'settings_interaction',
      setting_type: settingType,
      setting_value: settingValue,
      change_context: 'settings_page',
      page_source: 'privacy_settings_page',
      ...additionalContext
    });
  };

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">
            {t('controlsTitle')}
          </h1>
          
          <div className="text-center mb-12">
            <p className="text-lg leading-relaxed text-neutral-dark max-w-3xl mx-auto">
              {t('pageSubtitle')}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <PrivacyControls onSettingChange={handleSettingChange} />
          </div>

          <div className="prose prose-lg max-w-none text-neutral-dark">
            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('aboutAnalyticsTitle')}
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('aboutAnalyticsDescription')}
            </p>
            <ul className="text-lg leading-relaxed mb-8 ml-6 list-disc space-y-3">
              <li><strong className="text-black">{t('consentModeLabel')}:</strong> {t('consentModeFeature')}</li>
              <li><strong className="text-black">{t('ipAnonymizationLabel')}:</strong> {t('ipAnonymizationFeature')}</li>
              <li><strong className="text-black">{t('noAdvertisingLabel')}:</strong> {t('noAdvertisingFeature')}</li>
              <li><strong className="text-black">{t('dataRetentionLabel')}:</strong> {t('dataRetentionFeature')}</li>
              <li><strong className="text-black">{t('gdprComplianceLabel')}:</strong> {t('gdprComplianceFeature')}</li>
            </ul>
            <p className="text-lg leading-relaxed mb-6">
              {t('optOutInfo')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
