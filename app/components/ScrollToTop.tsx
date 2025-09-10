'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check if cookie banner is visible
    const checkCookieBanner = () => {
      try {
        const consent = localStorage.getItem('cookie-consent');
        setCookieBannerVisible(!consent);
      } catch {
        setCookieBannerVisible(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    checkCookieBanner();

    // Listen for storage changes (when cookie consent is given)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkCookieBanner();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-4 z-40 p-3 bg-accent-orange hover:bg-accent-orange/90 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 ${
        cookieBannerVisible 
          ? 'bottom-24 sm:bottom-4 sm:right-[432px]' // Above cookie banner on mobile, to the left on desktop
          : 'bottom-4' // Normal position when no cookie banner
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}
