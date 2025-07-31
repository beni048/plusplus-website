"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { trackPageView, updateConsent, GA_TRACKING_ID } from '@/lib/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    // Check if user has consented to cookies
    const consent = localStorage.getItem('cookie-consent');
    
    if (consent === 'accepted') {
      // Update consent for analytics
      updateConsent(true);
    }
  }, []);

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    // Track page views when pathname changes
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      trackPageView(pathname);
    }
  }, [pathname]);

  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Load gtag.js script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      
      {/* Initialize gtag with consent mode */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            // Initialize with consent mode v2 (privacy-first)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted',
              'wait_for_update': 500,
            });
            
            // Initialize Google Analytics
            gtag('js', new Date());
            
            // Configure GA4 with privacy settings
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: ${process.env.NEXT_PUBLIC_GA_ANONYMIZE_IP === 'true'},
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              send_page_view: false,
            });
            
            ${process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true' ? 
              "console.log('Google Analytics initialized with privacy-first settings');" : 
              ""
            }
          `,
        }}
      />
    </>
  );
}
