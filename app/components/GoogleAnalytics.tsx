"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { trackPageView, updateConsent, GA_TRACKING_ID, isAnalyticsEnabled } from '@/lib/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Handle page tracking when pathname changes
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      updateConsent(true);
      trackPageView(pathname);
    }
  }, [pathname]);

  // Don't render if analytics not configured
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: any[]) {
          window.dataLayer.push(args);
        };
        window.gtag('js', new Date());
        window.gtag('consent', 'default', {
          'analytics_storage': 'denied',
        });
        window.gtag('config', GA_TRACKING_ID!, {
          send_page_view: false,
        });
      }}
    />
  );
}
