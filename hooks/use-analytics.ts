"use client";

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, isAnalyticsActive } from '@/lib/gtag';

// Helper function to extract locale from pathname
const extractLocale = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocales = ['en', 'de', 'fr', 'it'];
  return possibleLocales.includes(segments[0]) ? segments[0] : 'en';
};

// Helper function to determine page type from pathname
const getPageType = (pathname: string): string => {
  if (pathname === '/' || pathname.match(/^\/[a-z]{2}$/)) return 'homepage';
  if (pathname.includes('/help')) return 'help';
  if (pathname.includes('/privacy-policy') || pathname.includes('/privacy-settings')) return 'legal';
  if (pathname.includes('/settings')) return 'settings';
  return 'other';
};

// Enhanced analytics hook for event tracking with component and page context
export function useAnalytics() {
  const pathname = usePathname();
  
  // Extract current page context
  const currentLocale = extractLocale(pathname);
  const currentPageType = getPageType(pathname);
  const currentPageContext = `${currentPageType}_page`;

  // Enhanced generic event tracking function with automatic context
  const trackCustomEvent = useCallback((
    action: string, 
    category: string, 
    options: {
      label?: string;
      value?: number;
      component_id?: string;
      component_type?: string;
      page_context?: string;
      locale?: string;
      [key: string]: any;
    } = {}
  ) => {
    // Merge with automatic context while allowing overrides
    const enhancedOptions = {
      page_context: currentPageContext,
      locale: currentLocale,
      ...options
    };
    
    trackEvent(action, category, enhancedOptions);
  }, [currentPageContext, currentLocale]);

  // Legacy support for simple parameters
  const trackCustomEventLegacy = useCallback((
    action: string, 
    category: string, 
    label?: string, 
    value?: number
  ) => {
    trackCustomEvent(action, category, { label, value });
  }, [trackCustomEvent]);

  // Enhanced pre-configured tracking functions for common events
  const trackContactFormSubmit = useCallback((formData?: {
    form_type?: string;
    fields_count?: number;
    form_location?: string;
  }) => {
    trackCustomEvent('submit', 'contact_form', {
      label: 'header',
      component_type: 'form',
      component_id: 'contact_form',
      ...formData
    });
  }, [trackCustomEvent]);

  const trackLanguageSwitch = useCallback((newLanguage: string, componentId?: string) => {
    trackCustomEvent('language_switch', 'navigation', {
      label: newLanguage,
      component_type: 'language_switcher',
      component_id: componentId || 'main_language_switcher',
      previous_locale: currentLocale
    });
  }, [trackCustomEvent, currentLocale]);

  const trackExternalLink = useCallback((url: string, linkText?: string, componentId?: string) => {
    trackCustomEvent('click', 'external_link', {
      label: linkText || url,
      component_type: 'link',
      component_id: componentId,
      link_url: url,
      link_domain: new URL(url).hostname
    });
  }, [trackCustomEvent]);

  const trackFileDownload = useCallback((fileName: string, fileType?: string, componentId?: string) => {
    trackCustomEvent('download', 'file', {
      label: fileName,
      component_type: 'download_button',
      component_id: componentId,
      file_name: fileName,
      file_type: fileType || fileName.split('.').pop()
    });
  }, [trackCustomEvent]);

  const trackCookieConsent = useCallback((action: 'accept' | 'decline' | 'customize', componentId?: string) => {
    trackCustomEvent(action, 'cookie_consent', {
      component_type: 'cookie_banner',
      component_id: componentId || 'cookie_consent_banner',
      consent_action: action
    });
  }, [trackCustomEvent]);

  const trackPrivacyAction = useCallback((action: 'opt_out' | 'opt_in' | 'delete_data', componentId?: string) => {
    trackCustomEvent(action, 'privacy_control', {
      component_type: 'privacy_controls',
      component_id: componentId || 'privacy_settings',
      privacy_action: action
    });
  }, [trackCustomEvent]);

  // New utility functions for component tracking
  const trackComponentInteraction = useCallback((
    componentId: string,
    componentType: string,
    action: string,
    additionalData?: Record<string, any>
  ) => {
    trackCustomEvent(action, 'component_interaction', {
      component_id: componentId,
      component_type: componentType,
      ...additionalData
    });
  }, [trackCustomEvent]);

  const trackPageSection = useCallback((
    sectionId: string,
    action: string = 'view',
    additionalData?: Record<string, any>
  ) => {
    trackCustomEvent(action, 'page_section', {
      component_id: sectionId,
      component_type: 'page_section',
      section_id: sectionId,
      ...additionalData
    });
  }, [trackCustomEvent]);

  return {
    // Enhanced functions
    trackCustomEvent,
    trackContactFormSubmit,
    trackLanguageSwitch,
    trackExternalLink,
    trackFileDownload,
    trackCookieConsent,
    trackPrivacyAction,
    
    // New utility functions
    trackComponentInteraction,
    trackPageSection,
    
    // Legacy support
    trackCustomEventLegacy,
    
    // Context information
    isActive: isAnalyticsActive(),
    currentLocale,
    currentPageType,
    currentPageContext,
    
    // Helper functions
    getPageType: useCallback((path: string) => getPageType(path), []),
    extractLocale: useCallback((path: string) => extractLocale(path), [])
  };
}
