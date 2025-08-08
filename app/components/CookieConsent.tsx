"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { updateConsent } from '@/lib/gtag';
import { useAnalytics } from '@/hooks/use-analytics';

export default function CookieConsentBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const { trackCookieConsent } = useAnalytics();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch (error) {
      // Show banner if localStorage fails (e.g., private browsing)
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    trackCookieConsent('accept');
    try {
      localStorage.setItem('cookie-consent', 'accepted');
      updateConsent(true);
      setShowBanner(false);
    } catch (error) {
      console.warn('Failed to save cookie consent:', error);
    }
  };

  const handleDecline = () => {
    trackCookieConsent('decline');
    try {
      localStorage.setItem('cookie-consent', 'declined');
      updateConsent(false);
      setShowBanner(false);
    } catch (error) {
      console.warn('Failed to save cookie consent:', error);
    }
  };

  if (!showBanner) {
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
              className="text-black underline hover:text-accent-orange transition-colors"
            >
              {t('learnMore')}
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleAccept}
              className="bg-accent-orange hover:bg-accent-orange/90 text-white flex-1"
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