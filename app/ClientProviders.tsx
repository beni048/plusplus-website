'use client';

import { ReactNode } from 'react';
import { FloatingUIProvider } from '@/app/context/FloatingUIContext';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <FloatingUIProvider>
      {children}
    </FloatingUIProvider>
  );
}
