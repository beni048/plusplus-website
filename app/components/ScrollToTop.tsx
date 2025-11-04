'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useFloatingUI } from '@/app/context/FloatingUIContext';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { cookieBannerVisible } = useFloatingUI();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
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
      // Position dynamically based on cookie banner visibility
      // Cookie banner: 16px (bottom-4) + 180px (banner height including padding) + 8px (gap) = 204px
      // No banner: 16px (bottom-4)
      className={`fixed right-4 z-40 p-3 bg-accent-red hover:bg-accent-red/90 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-red focus:ring-offset-2 ${
        cookieBannerVisible 
          ? 'bottom-52 sm:bottom-40' // Above cookie banner (mobile: 208px, desktop: 160px)
          : 'bottom-4' // Normal position when no cookie banner
      }`}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}
