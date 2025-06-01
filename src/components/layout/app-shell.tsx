
'use client';

import * as React from 'react';
// Removed SidebarProvider and related imports
import { Logo } from '@/components/shared/logo';
import { Header } from './header';
import { BottomNavBar } from './bottom-nav-bar';
import { TooltipProvider } from '@/components/ui/tooltip'; // Keep TooltipProvider

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-svh w-full flex-col"> {/* Simplified root div */}
        <Header />
        <main className="flex-1 px-4 pb-20 pt-[calc(4rem+1rem)] md:px-6 md:pb-6 md:pt-[calc(4rem+1.5rem)] lg:px-8 lg:pb-8 lg:pt-[calc(4rem+1.5rem)]">
          {/* Adjusted top padding: header height (4rem) + spacing */}
          {children}
        </main>
        <BottomNavBar />
      </div>
    </TooltipProvider>
  );
}
