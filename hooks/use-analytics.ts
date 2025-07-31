"use client";

import { useCallback } from 'react';
import { trackEvent, isAnalyticsActive } from '@/lib/gtag';

// Simplified analytics hook for event tracking
export function useAnalytics() {
  // Generic event tracking function
  const trackCustomEvent = useCallback((
    action: string, 
    category: string, 
    label?: string, 
    value?: number
  ) => {
    trackEvent(action, category, label, value);
  }, []);

  // Pre-configured tracking functions for common events
  const trackContactFormSubmit = useCallback(() => {
    trackCustomEvent('submit', 'contact_form', 'header');
  }, [trackCustomEvent]);

  const trackLanguageSwitch = useCallback((newLanguage: string) => {
    trackCustomEvent('language_switch', 'navigation', newLanguage);
  }, [trackCustomEvent]);

  const trackExternalLink = useCallback((url: string, linkText?: string) => {
    trackCustomEvent('click', 'external_link', linkText || url);
  }, [trackCustomEvent]);

  const trackFileDownload = useCallback((fileName: string) => {
    trackCustomEvent('download', 'file', fileName);
  }, [trackCustomEvent]);

  const trackCookieConsent = useCallback((action: 'accept' | 'decline' | 'customize') => {
    trackCustomEvent(action, 'cookie_consent');
  }, [trackCustomEvent]);

  const trackPrivacyAction = useCallback((action: 'opt_out' | 'opt_in' | 'delete_data') => {
    trackCustomEvent(action, 'privacy_control');
  }, [trackCustomEvent]);

  return {
    trackCustomEvent,
    trackContactFormSubmit,
    trackLanguageSwitch,
    trackExternalLink,
    trackFileDownload,
    trackCookieConsent,
    trackPrivacyAction,
    isActive: isAnalyticsActive(),
  };
}
