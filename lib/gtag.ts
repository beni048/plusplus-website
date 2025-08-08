// Simple Google Analytics 4 setup
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// Global gtag interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Check if analytics is enabled and user consented
export const isAnalyticsEnabled = (): boolean => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return false;
  const consent = localStorage.getItem('cookie-consent');
  return consent === 'accepted';
};

// Simple page view tracking
export const trackPageView = (url: string): void => {
  if (!isAnalyticsEnabled() || typeof window.gtag === 'undefined') return;
  
  window.gtag('config', GA_TRACKING_ID!, {
    page_path: url,
  });
};

// Simple event tracking for basic interactions
export const trackEvent = (action: string, category: string, label?: string): void => {
  if (!isAnalyticsEnabled() || typeof window.gtag === 'undefined') return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
  });
};

// Update consent when user accepts/rejects cookies
export const updateConsent = (granted: boolean): void => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || typeof window.gtag === 'undefined') return;

  window.gtag('consent', 'update', {
    'analytics_storage': granted ? 'granted' : 'denied',
  });
};

// Simple opt-out functionality
export const optOutAnalytics = (): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('cookie-consent', 'declined');
  updateConsent(false);
};

// Simple opt-in functionality  
export const optInAnalytics = (): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('cookie-consent', 'accepted');
  updateConsent(true);
};

// Get opt-out status
export const getOptOutStatus = (): boolean => {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem('cookie-consent') !== 'accepted';
};

// Simple data deletion
export const requestDataDeletion = (): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem('cookie-consent');
  localStorage.removeItem('cookie-preferences');
};
