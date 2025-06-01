'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme, assuming 'dark' class is on <html>
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };
  
  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
             {/* Placeholder for trigger, actual trigger is in SidebarProvider context */}
          </div>
          <Logo size="md" />
        </div>
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <Logo size="md" />
      </div>
      <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </header>
  );
}
