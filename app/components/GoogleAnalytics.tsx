"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { trackPageView, GA_TRACKING_ID, isAnalyticsEnabled } from '@/lib/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Handle page tracking when pathname changes
  useEffect(() => {
    // Track page views for both development and production
    // In development: automatically tracked (no consent needed)
    // In production: only tracked after user accepts cookies
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction && !isAnalyticsEnabled()) return;
    if (!GA_TRACKING_ID || typeof window.gtag === 'undefined') return;
    
    trackPageView(pathname);
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
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        };
        window.gtag('js', new Date());
        
        // In development, allow analytics by default for testing
        // In production, deny by default and require user consent
        const isProduction = process.env.NODE_ENV === 'production';
        window.gtag('consent', 'default', {
          'analytics_storage': isProduction ? 'denied' : 'granted',
        });
        
        window.gtag('config', GA_TRACKING_ID!, {
          send_page_view: false,
        });
      }}
    />
  );
}
