"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { updateConsent } from '@/lib/gtag';
import { useAnalytics } from '@/hooks/use-analytics';

export default function CookieConsentBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const { trackCookieConsent } = useAnalytics();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: false, // Keep false for GDPR compliance
    };
    
    setPreferences(newPreferences);
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));
    
    // Update Google Analytics consent
    updateConsent(true);
    
    // Track the consent action
    trackCookieConsent('accept');
    
    setShowBanner(false);
  };

  const handleDeclineAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    
    setPreferences(newPreferences);
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));
    
    // Update Google Analytics consent
    updateConsent(false);
    
    // Track the consent action
    trackCookieConsent('decline');
    
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const consentStatus = preferences.analytics ? 'accepted' : 'declined';
    localStorage.setItem('cookie-consent', consentStatus);
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    
    // Update Google Analytics consent
    updateConsent(preferences.analytics);
    
    // Track the consent action
    trackCookieConsent('customize');
    
    setShowBanner(false);
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:w-96">
      <Card className="p-6 bg-white shadow-lg border-primary-teal/20">
        <div className="space-y-4">
          <h3 className="font-semibold text-black">
            {t('title')}
          </h3>
          <p className="text-sm text-neutral-dark">
            {t('description')}{' '}
            <Link 
              href={`/${locale}/privacy-policy`} 
              className="text-black underline hover:text-accent-orange transition-colors"
            >
              {t('learnMore')}
            </Link>
          </p>

          {/* Cookie Preferences Details */}
          {showDetails && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium text-sm">{t('cookieSettings')}</h4>
              
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-sm font-medium">{t('necessary')}</Label>
                  <p className="text-xs text-neutral-dark">{t('necessaryDescription')}</p>
                </div>
                <Switch
                  checked={preferences.necessary}
                  disabled
                  className="opacity-50"
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-sm font-medium">{t('analytics')}</Label>
                  <p className="text-xs text-neutral-dark">{t('analyticsDescription')}</p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                />
              </div>

              {/* Marketing Cookies - Disabled for GDPR compliance */}
              <div className="flex items-center justify-between opacity-50">
                <div className="flex-1">
                  <Label className="text-sm font-medium">{t('marketing')}</Label>
                  <p className="text-xs text-neutral-dark">{t('marketingDescription')}</p>
                </div>
                <Switch
                  checked={preferences.marketing}
                  disabled
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 flex-col sm:flex-row">
            {showDetails ? (
              <>
                <Button
                  onClick={handleSavePreferences}
                  className="bg-accent-orange hover:bg-accent-orange/90 text-white"
                  size="sm"
                >
                  {t('savePreferences')}
                </Button>
                <Button
                  onClick={() => setShowDetails(false)}
                  variant="outline"
                  className="border-black text-black hover:bg-accent-orange hover:text-white hover:border-accent-orange transition-colors"
                  size="sm"
                >
                  {t('back')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleAcceptAll}
                  className="bg-accent-orange hover:bg-accent-orange/90 text-white"
                  size="sm"
                >
                  {t('acceptAll')}
                </Button>
                <Button
                  onClick={handleDeclineAll}
                  variant="outline"
                  className="border-black text-black hover:bg-accent-orange hover:text-white hover:border-accent-orange transition-colors"
                  size="sm"
                >
                  {t('declineAll')}
                </Button>
                <Button
                  onClick={() => setShowDetails(true)}
                  variant="ghost"
                  className="text-black hover:bg-accent-orange hover:text-white transition-colors"
                  size="sm"
                >
                  {t('customize')}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}