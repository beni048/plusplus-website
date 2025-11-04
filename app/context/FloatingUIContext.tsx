"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FloatingUIContextType {
  cookieBannerVisible: boolean;
  setCookieBannerVisible: (visible: boolean) => void;
}

const FloatingUIContext = createContext<FloatingUIContextType | undefined>(undefined);

export function FloatingUIProvider({ children }: { children: ReactNode }) {
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  // Initialize on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      setCookieBannerVisible(!consent);
    } catch {
      setCookieBannerVisible(true);
    }
  }, []);

  // Always provide the context, even before mounting
  // This prevents errors when children try to use the hook
  return (
    <FloatingUIContext.Provider value={{ cookieBannerVisible, setCookieBannerVisible }}>
      {children}
    </FloatingUIContext.Provider>
  );
}

export function useFloatingUI() {
  const context = useContext(FloatingUIContext);
  if (!context) {
    throw new Error('useFloatingUI must be used within FloatingUIProvider');
  }
  return context;
}
