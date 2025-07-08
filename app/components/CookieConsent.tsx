"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

export default function CookieConsentBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:w-96">
      <Card className="p-6 bg-white shadow-lg border-primary-teal/20">
        <div className="space-y-4">
          <h3 className="font-semibold text-primary-navy">
            {t('title')}
          </h3>
          <p className="text-sm text-neutral-dark">
            {t('description')}{' '}
            <Link 
              href={`/${locale}/privacy-policy`} 
              className="text-primary-teal underline hover:text-primary-blue"
            >
              {t('learnMore')}
            </Link>
          </p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button
              onClick={handleAccept}
              className="bg-primary-teal hover:bg-primary-teal/90 text-primary-navy"
              size="sm"
            >
              {t('accept')}
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              className="border-primary-teal text-primary-teal hover:bg-primary-teal/10"
              size="sm"
            >
              {t('decline')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}