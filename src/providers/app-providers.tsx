'use client';

import type React from 'react';
// import { ThemeProvider } from 'next-themes'; // Example, if theme switching is needed

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Example: <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  // For now, just passing children through. If QueryClient or other providers are needed, add them here.
  return <>{children}</>;
}
