"use client";

import React, { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, trackPageView, isAnalyticsActive } from '@/lib/gtag';

// Custom hook for analytics tracking
export function useAnalytics() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    if (isAnalyticsActive()) {
      trackPageView(pathname, document.title);
    }
  }, [pathname]);

  // Custom event tracking function
  const trackCustomEvent = useCallback((
    action: string, 
    category: string, 
    label?: string, 
    value?: number
  ) => {
    if (isAnalyticsActive()) {
      trackEvent(action, category, label, value);
    }
  }, []);

  // Specific tracking functions for common events
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

// Higher-order component to add analytics tracking to any component
export function withAnalytics<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
  eventCategory: string
): React.ComponentType<T> {
  const AnalyticsWrapper = (props: T) => {
    const { trackCustomEvent } = useAnalytics();

    const enhancedProps = {
      ...props,
      onAnalyticsEvent: (action: string, label?: string, value?: number) => {
        trackCustomEvent(action, eventCategory, label, value);
      },
    };

    return React.createElement(WrappedComponent, enhancedProps);
  };

  return AnalyticsWrapper;
}
