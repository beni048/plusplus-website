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
  const { trackCookieConsent, trackCustomEvent } = useAnalytics();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptOptional = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
    };
    
    trackCustomEvent('accept_optional_cookies', 'cookie_consent', {
      component_id: 'cookie_consent_accept_optional',
      component_type: 'button',
      consent_method: 'accept_optional',
      categories_enabled: {
        necessary: true,
        analytics: true
      },
      previous_preferences: preferences
    });
    
    setPreferences(newPreferences);
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));
    updateConsent(true);
    trackCookieConsent('accept', 'cookie_consent_accept_optional');
    setShowBanner(false);
  };

  const handleDeclineOptional = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
    };
    
    trackCustomEvent('decline_optional_cookies', 'cookie_consent', {
      component_id: 'cookie_consent_decline_optional',
      component_type: 'button',
      consent_method: 'decline_optional',
      categories_declined: {
        analytics: true
      },
      previous_preferences: preferences
    });
    
    setPreferences(newPreferences);
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));
    updateConsent(false);
    trackCookieConsent('decline', 'cookie_consent_decline_optional');
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const consentStatus = preferences.analytics ? 'accepted' : 'declined';
    
    trackCustomEvent('save_cookie_preferences', 'cookie_consent', {
      component_id: 'cookie_consent_save_preferences',
      component_type: 'button',
      consent_method: 'customize',
      final_preferences: preferences,
      analytics_enabled: preferences.analytics,
      consent_status: consentStatus
    });
    
    localStorage.setItem('cookie-consent', consentStatus);
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    updateConsent(preferences.analytics);
    trackCookieConsent('customize', 'cookie_consent_save_preferences');
    setShowBanner(false);
  };

  const handlePreferenceChange = (key: 'necessary' | 'analytics', value: boolean) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    
    const previousValue = preferences[key];
    
    trackCustomEvent('toggle_cookie_category', 'cookie_consent', {
      component_id: `cookie_toggle_${key}`,
      component_type: 'cookie_toggle',
      category: key,
      enabled: value,
      previous_value: previousValue,
      consent_stage: 'customization',
      state_change: `${key}_${previousValue}_to_${value}`
    });
    
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:w-[400px] sm:max-w-[90vw]">
      <Card className="p-4 bg-white shadow-lg border-primary-teal/20">
        <div className="space-y-4">
          {/* Minimal, essential message only */}
          <p className="text-sm text-neutral-dark">
            {t('description')}{' '}
            <Link 
              href={`/${locale}/privacy-policy`} 
              className="text-black underline hover:text-accent-orange transition-colors"
              onClick={() => {
                trackCustomEvent('click_privacy_link', 'cookie_consent', {
                  component_id: 'cookie_banner_privacy_link',
                  component_type: 'link',
                  link_destination: 'privacy_policy',
                  consent_stage: showDetails ? 'detailed_view' : 'banner_view'
                });
              }}
            >
              {t('learnMore')}
            </Link>
          </p>

          {/* Streamlined cookie preferences - only show when customizing */}
          {showDetails && (
            <div className="space-y-3 border-t pt-4">
              {/* Essential Cookies - Always Active */}
              <div className="flex items-center justify-between py-2">
                <div className="flex-1 pr-4">
                  <Label className="text-sm font-medium text-gray-900">Essential Cookies</Label>
                  <p className="text-xs text-gray-600 mt-1">Required for website functionality</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                    Always On
                  </span>
                  <Switch
                    checked={true}
                    disabled
                    className="opacity-70"
                  />
                </div>
              </div>

              {/* Analytics Cookies - User Choice */}
              <div className="flex items-center justify-between py-2">
                <div className="flex-1 pr-4">
                  <Label className="text-sm font-medium text-gray-900">Analytics</Label>
                  <p className="text-xs text-gray-600 mt-1">Help improve our website</p>
                </div>
                <div className="flex-shrink-0">
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked: boolean) => handlePreferenceChange('analytics', checked)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Minimal button layout */}
          <div className="flex gap-2 mt-4">
            {showDetails ? (
              <div className="flex gap-2 w-full">
                <Button
                  onClick={handleSavePreferences}
                  className="bg-accent-orange hover:bg-accent-orange/90 text-white flex-1 h-10"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    trackCustomEvent('click_back_button', 'cookie_consent', {
                      component_id: 'cookie_consent_back_button',
                      component_type: 'button'
                    });
                    setShowDetails(false);
                  }}
                  variant="outline"
                  className="flex-1 h-10"
                >
                  Back
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={handleAcceptOptional}
                  className="bg-accent-orange hover:bg-accent-orange/90 text-white flex-1 h-10"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleDeclineOptional}
                  variant="outline"
                  className="flex-1 h-10"
                >
                  Essential Only
                </Button>
                <Button
                  onClick={() => {
                    trackCustomEvent('click_customize_button', 'cookie_consent', {
                      component_id: 'cookie_consent_customize_button',
                      component_type: 'button'
                    });
                    setShowDetails(true);
                  }}
                  variant="ghost"
                  className="px-3 h-10 text-sm"
                >
                  Options
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}