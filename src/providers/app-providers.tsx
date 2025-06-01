
'use client';

import type React from 'react';
import { AuthProvider } from '@/contexts/auth-context'; // Import the new AuthProvider

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
