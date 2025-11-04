"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { updateConsent } from '@/lib/gtag';
import { useAnalytics } from '@/hooks/use-analytics';
import { useFloatingUI } from '@/app/context/FloatingUIContext';

export default function CookieConsentBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const { trackCookieConsent } = useAnalytics();
  const { setCookieBannerVisible } = useFloatingUI();
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Initialize banner state after hydration
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      const showBan = !consent;
      setShowBanner(showBan);
      setCookieBannerVisible(showBan);
      setIsMounted(true);
      console.log('[CookieConsent] Initialized. Consent:', consent, 'Show banner:', showBan);
    } catch (err) {
      // Show banner if localStorage fails (e.g., private browsing)
      setShowBanner(true);
      setCookieBannerVisible(true);
      setIsMounted(true);
      console.log('[CookieConsent] localStorage failed, showing banner');
    }
  }, []);

  const handleAccept = () => {
    try {
      console.log('[CookieConsent] Accepting cookies...');
      // 1. Set the cookie first so analytics functions work
      localStorage.setItem('cookie-consent', 'accepted');
      console.log('[CookieConsent] Consent saved to localStorage');
      
      // 2. Update gtag consent (this should work now)
      updateConsent(true);
      console.log('[CookieConsent] gtag consent updated');
      
      // 3. Track the event (now that consent is set)
      trackCookieConsent('accept');
      console.log('[CookieConsent] Event tracked');
      
      // 4. Hide banner and notify context
      setShowBanner(false);
      setCookieBannerVisible(false);
      console.log('[CookieConsent] Banner hidden');
    } catch (error) {
      console.error('[CookieConsent] Failed to save cookie consent:', error);
    }
  };

  const handleDecline = () => {
    try {
      console.log('[CookieConsent] Declining cookies...');
      // 1. Set the cookie first
      localStorage.setItem('cookie-consent', 'declined');
      console.log('[CookieConsent] Consent saved to localStorage');
      
      // 2. Update gtag consent
      updateConsent(false);
      console.log('[CookieConsent] gtag consent updated');
      
      // 3. Track the event
      trackCookieConsent('decline');
      console.log('[CookieConsent] Event tracked');
      
      // 4. Hide banner and notify context
      setShowBanner(false);
      setCookieBannerVisible(false);
      console.log('[CookieConsent] Banner hidden');
    } catch (error) {
      console.error('[CookieConsent] Failed to save cookie consent:', error);
    }
  };

  if (!isMounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:w-[400px] sm:max-w-[90vw]">
      <Card className="p-4 bg-white shadow-lg border-primary-teal/20">
        <div className="space-y-4">
          <p className="text-sm text-neutral-dark">
            {t('description')}{' '}
            <Link 
              href={`/${locale}/privacy-policy`} 
              className="text-black underline hover:text-accent-red transition-colors"
            >
              {t('learnMore')}
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleAccept}
              className="bg-accent-red hover:bg-accent-red/90 text-white flex-1"
            >
              {t('acceptOptional')}
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1"
            >
              {t('declineOptional')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}