"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { trackPageView, updateConsent, GA_TRACKING_ID, isAnalyticsEnabled } from '@/lib/gtag';

// Initialize Google Analytics gtag function
const initializeGtag = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args);
    };
    window.gtag = gtag;
    
    // Set consent defaults to 'denied' for GDPR compliance
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted',
      'wait_for_update': 500,
    });
    
    // Initialize Google Analytics with current timestamp
    window.gtag('js', new Date());
    
    // Configure GA4 with privacy settings
    window.gtag('config', GA_TRACKING_ID!, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: false, // We handle page views manually
    });
    
    // Debug logging if enabled in development
    if (window.location.hostname === 'localhost') {
      console.log('GA4 initialized:', GA_TRACKING_ID);
    }
  } catch (error) {
    console.warn('Google Analytics initialization failed:', error);
  }
};

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Handle consent and page tracking when pathname changes
  useEffect(() => {
    try {
      // Early return if analytics not configured or disabled
      if (!isAnalyticsEnabled()) return;
      
      // Get current consent status from localStorage
      const consent = localStorage.getItem('cookie-consent');
      
      // Update analytics consent based on user choice
      if (consent === 'accepted') {
        updateConsent(true);
        // Track page view after consent granted (small delay ensures gtag is ready)
        setTimeout(() => trackPageView(pathname), 100);
      } else if (consent === 'declined') {
        updateConsent(false);
      }
    } catch (error) {
      console.warn('Google Analytics consent handling failed:', error);
    }
  }, [pathname]);

  // Don't render scripts if analytics disabled or not configured
  if (!isAnalyticsEnabled()) {
    return null;
  }

  return (
    <>
      {/* Load Google Analytics gtag.js library */}
      <Script
        strategy="beforeInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={initializeGtag}
        onError={(e) => {
          console.warn('Google Analytics script failed to load:', e);
        }}
      />
    </>
  );
}
