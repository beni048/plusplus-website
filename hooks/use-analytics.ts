"use client";

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, isAnalyticsEnabled } from '@/lib/gtag';

// Simple analytics hook for basic tracking
export function useAnalytics() {
  const pathname = usePathname();
  
  // Simple event tracking
  const trackCustomEvent = useCallback((
    action: string, 
    category: string, 
    label?: string
  ) => {
    trackEvent(action, category, label);
  }, []);

  // Pre-configured tracking functions for common events
  const trackContactFormSubmit = useCallback(() => {
    trackEvent('submit', 'contact_form', 'header_form');
  }, []);

  const trackLanguageSwitch = useCallback((newLanguage: string) => {
    trackEvent('language_switch', 'navigation', newLanguage);
  }, []);

  const trackExternalLink = useCallback((url: string) => {
    trackEvent('click', 'external_link', url);
  }, []);

  const trackCookieConsent = useCallback((action: 'accept' | 'decline') => {
    trackEvent(action, 'cookie_consent');
  }, []);

  return {
    trackCustomEvent,
    trackContactFormSubmit,
    trackLanguageSwitch,
    trackExternalLink,
    trackCookieConsent,
    isActive: isAnalyticsEnabled(),
  };
}
