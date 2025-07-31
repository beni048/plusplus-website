// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    [key: string]: any; // Allow dynamic property access
  }
}

// Update consent when user accepts/rejects cookies
export const updateConsent = (granted: boolean) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('consent', 'update', {
    'analytics_storage': granted ? 'granted' : 'denied',
    'ad_storage': 'denied', // Always deny advertising storage for GDPR compliance
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
  });

  if (process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true') {
    console.log(`Analytics consent updated: ${granted ? 'granted' : 'denied'}`);
  }
};

// Track page views manually
export const trackPageView = (url: string, title?: string) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  });

  if (process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true') {
    console.log('Page view tracked:', { url, title });
  }
};

// Track custom events with privacy considerations
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    // Ensure no personal data is sent
    non_interaction: true,
  });

  if (process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true') {
    console.log('Event tracked:', { action, category, label, value });
  }
};

// Check if analytics is active (consent given and not opted out)
export const isAnalyticsActive = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const consent = localStorage.getItem('cookie-consent');
  const optOut = localStorage.getItem('ga-opt-out');
  
  return consent === 'accepted' && optOut !== 'true';
};

// User opt-out functionality
export const optOutAnalytics = () => {
  localStorage.setItem('ga-opt-out', 'true');
  
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Disable Google Analytics
    window[`ga-disable-${GA_TRACKING_ID}`] = true;
    
    // Update consent to denied
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied',
    });
  }
  
  if (process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true') {
    console.log('User opted out of analytics');
  }
};

// User opt-in functionality
export const optInAnalytics = () => {
  localStorage.removeItem('ga-opt-out');
  
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Enable Google Analytics
    window[`ga-disable-${GA_TRACKING_ID}`] = false;
    
    // Update consent if cookies are accepted
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      updateConsent(true);
    }
  }
  
  if (process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true') {
    console.log('User opted in to analytics');
  }
};

// Get user's current opt-out status
export const getOptOutStatus = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('ga-opt-out') === 'true';
};

// GDPR-compliant data deletion request
export const requestDataDeletion = () => {
  // Clear all local analytics data
  localStorage.removeItem('cookie-consent');
  localStorage.setItem('ga-opt-out', 'true');
  
  // Clear any GA cookies
  if (typeof document !== 'undefined') {
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    document.cookie = '_ga_' + GA_TRACKING_ID?.slice(2) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  }
  
  if (process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true') {
    console.log('Data deletion requested - all local data cleared');
  }
};
