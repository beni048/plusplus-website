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
  
  const consent = localStorage.getItem('cookie-consent');
  const optOut = localStorage.getItem('ga-opt-out');
  
  return consent === 'accepted' && optOut !== 'true';
};

// Update consent when user accepts/rejects cookies
export const updateConsent = (granted: boolean): void => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;

  window.gtag('consent', 'update', {
    'analytics_storage': granted ? 'granted' : 'denied',
    'ad_storage': 'denied', // Always denied for GDPR compliance
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
  });

  if (GA_DEBUG_MODE) {
    console.log(`Analytics consent: ${granted ? 'granted' : 'denied'}`);
  }
};

// Track page views manually for better control
export const trackPageView = (url: string, title?: string): void => {
  if (!isAnalyticsActive()) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  });

  if (GA_DEBUG_MODE) {
    console.log('Page view tracked:', url);
  }
};

// Track custom events with privacy protection
export const trackEvent = (action: string, category: string, label?: string, value?: number): void => {
  if (!isAnalyticsActive()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: true, // Prevent bounce rate impact
  });

  if (GA_DEBUG_MODE) {
    console.log('Event tracked:', { action, category, label, value });
  }
};

// User opt-out functionality (for privacy controls)
export const optOutAnalytics = (): void => {
  localStorage.setItem('ga-opt-out', 'true');
  
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window[`ga-disable-${GA_TRACKING_ID}`] = true;
    updateConsent(false);
  }
  
  if (GA_DEBUG_MODE) {
    console.log('User opted out of analytics');
  }
};

// User opt-in functionality (for privacy controls)
export const optInAnalytics = (): void => {
  localStorage.removeItem('ga-opt-out');
  
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window[`ga-disable-${GA_TRACKING_ID}`] = false;
    
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      updateConsent(true);
    }
  }
  
  if (GA_DEBUG_MODE) {
    console.log('User opted in to analytics');
  }
};

// Get user's current opt-out status
export const getOptOutStatus = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('ga-opt-out') === 'true';
};

// GDPR-compliant data deletion
export const requestDataDeletion = (): void => {
  localStorage.removeItem('cookie-consent');
  localStorage.setItem('ga-opt-out', 'true');
  
  // Clear GA cookies
  if (typeof document !== 'undefined' && GA_TRACKING_ID) {
    const domain = window.location.hostname;
    document.cookie = `_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    document.cookie = `_ga_${GA_TRACKING_ID.slice(2)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    document.cookie = `_gid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
  }
  
  if (GA_DEBUG_MODE) {
    console.log('Analytics data deletion completed');
  }
};
