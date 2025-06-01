
'use client';

import { AppShell } from '@/components/layout/app-shell';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FullPageLoader } from '@/components/shared/full-page-loader';

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only run this effect if Firebase auth has finished loading
    // and there's no user.
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [loading, user, router]);

  // While loading, or if there's no user (and redirection is imminent),
  // show a full page loader to prevent flashing unauthenticated content.
  if (loading || (!loading && !user)) {
    return <FullPageLoader />;
  }

  // If loading is complete and user exists, render the app shell and children.
  return <AppShell>{children}</AppShell>;
}
