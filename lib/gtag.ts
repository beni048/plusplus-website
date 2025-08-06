// Google Analytics 4 utilities with GDPR compliance
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// Environment configuration
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
const GA_DEBUG_MODE = process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true';

// Global gtag interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    [key: string]: any;
  }
}

// Check if analytics is properly configured and enabled
export const isAnalyticsEnabled = (): boolean => {
  return Boolean(GA_TRACKING_ID && ANALYTICS_ENABLED);
};

// Check if user has consented and analytics is active
export const isAnalyticsActive = (): boolean => {
  if (typeof window === 'undefined' || !isAnalyticsEnabled()) return false;
  
  if (typeof localStorage === 'undefined') return false;
  
  const consent = localStorage.getItem('cookie-consent');
  const optOut = localStorage.getItem('ga-opt-out');
  
  return consent === 'accepted' && optOut !== 'true';
};

// Update consent when user accepts/rejects cookies
export const updateConsent = (granted: boolean): void => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;
  if (typeof window.gtag === 'undefined') return;

  try {
    window.gtag('consent', 'update', {
      'analytics_storage': granted ? 'granted' : 'denied',
      'ad_storage': 'denied', // Always denied for GDPR compliance
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
    });
  } catch (error) {
    console.warn('Google Analytics consent update failed:', error);
  }

  if (GA_DEBUG_MODE) {
    console.log(`🔧 GA4 Consent Update: Analytics ${granted ? 'GRANTED' : 'DENIED'}`);
    console.log('📊 Consent parameters:', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }
};

// Track page views manually for better control
export const trackPageView = (url: string, title?: string): void => {
  if (!isAnalyticsActive()) return;
  if (typeof window.gtag === 'undefined') return;
  if (typeof document === 'undefined') return;

  try {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  } catch (error) {
    console.warn('Google Analytics page view tracking failed:', error);
  }

  if (GA_DEBUG_MODE) {
    console.log('Page view tracked:', url);
  }
};

// Enhanced event tracking interface for better component and page context
interface TrackEventOptions {
  label?: string;
  value?: number;
  component_id?: string;
  component_type?: string;
  page_context?: string;
  locale?: string;
  [key: string]: any; // Allow additional custom parameters
}

// Utility function to clean undefined values from event parameters
const cleanEventParams = (params: Record<string, any>): Record<string, any> => {
  const cleaned: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

// Enhanced track custom events with privacy protection and component identification
export const trackEvent = (
  action: string, 
  category: string, 
  options: TrackEventOptions = {}
): void => {
  if (!isAnalyticsActive()) return;

  // Extract options with backward compatibility
  const {
    label,
    value,
    component_id,
    component_type,
    page_context,
    locale,
    ...customParams
  } = options;

  // Build enhanced event parameters
  const eventParams = {
    event_category: category,
    event_label: label,
    value: value,
    component_id: component_id,
    component_type: component_type,
    page_context: page_context,
    locale: locale,
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
    page_title: typeof document !== 'undefined' ? document.title : undefined,
    timestamp: new Date().toISOString(),
    non_interaction: true, // Prevent bounce rate impact
    ...customParams
  };

  // Clean undefined values before sending to GA4
  const cleanParams = cleanEventParams(eventParams);
  
  if (typeof window.gtag === 'undefined') return;

  try {
    window.gtag('event', action, cleanParams);
  } catch (error) {
    console.warn('Google Analytics event tracking failed:', error);
  }

  if (GA_DEBUG_MODE) {
    console.group(`🎯 GA4 Event: ${action}`);
    console.log('📊 Category:', category);
    console.log('🏷️ Parameters:', cleanParams);
    console.log('⏰ Timestamp:', new Date().toLocaleString());
    console.groupEnd();
  }
};

// Legacy function signature support for backward compatibility
export const trackEventLegacy = (action: string, category: string, label?: string, value?: number): void => {
  trackEvent(action, category, { label, value });
};

// User opt-out functionality (for privacy controls)
export const optOutAnalytics = (): void => {
  if (typeof localStorage === 'undefined') return;
  
  localStorage.setItem('ga-opt-out', 'true');
  
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window[`ga-disable-${GA_TRACKING_ID}`] = true;
    updateConsent(false);
  }
  
  if (GA_DEBUG_MODE) {
    console.log('🚫 User opted OUT of analytics');
    console.log('💾 ga-opt-out localStorage:', localStorage.getItem('ga-opt-out'));
  }
};

// User opt-in functionality (for privacy controls)
export const optInAnalytics = (): void => {
  if (typeof localStorage === 'undefined') return;
  
  localStorage.removeItem('ga-opt-out');
  
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window[`ga-disable-${GA_TRACKING_ID}`] = false;
    
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      updateConsent(true);
    }
  }
  
  if (GA_DEBUG_MODE) {
    console.log('✅ User opted IN to analytics');
    console.log('💾 ga-opt-out localStorage:', localStorage.getItem('ga-opt-out'));
    console.log('💾 cookie-consent localStorage:', localStorage.getItem('cookie-consent'));
  }
};

// Get user's current opt-out status
export const getOptOutStatus = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem('ga-opt-out') === 'true';
};

// GDPR-compliant data deletion
export const requestDataDeletion = (): void => {
  if (typeof localStorage === 'undefined') return;
  
  localStorage.removeItem('cookie-consent');
  localStorage.setItem('ga-opt-out', 'true');
  
  // Clear GA cookies
  if (typeof document !== 'undefined' && typeof window !== 'undefined' && GA_TRACKING_ID) {
    const domain = window.location.hostname;
    document.cookie = `_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    document.cookie = `_ga_${GA_TRACKING_ID.slice(2)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    document.cookie = `_gid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
  }
  
  if (GA_DEBUG_MODE) {
    console.log('Analytics data deletion completed');
  }
};
