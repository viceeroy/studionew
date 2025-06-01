
'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, type NavLink } from './nav-links';
import { cn } from '@/lib/utils';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Check initial theme, assuming 'dark' class is on <html>
    const currentTheme = document.documentElement.classList.contains('dark');
    setIsDarkMode(currentTheme);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };
  
  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
        <div className="flex items-center gap-2">
          <Logo size="md" />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex h-8 w-20 rounded-md bg-muted animate-pulse" /> {/* Placeholder for nav links */}
          <div className="h-8 w-8 rounded-full bg-muted animate-pulse" /> {/* Placeholder for theme button */}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2">
        {/* Logo is part of AppShell's SidebarHeader for desktop, this one is more for mobile or when sidebar is hidden/gone */}
        {/* <Logo size="md" />  Let's rely on the one in Sidebar for consistency if Sidebar is kept */}
      </div>

      {/* Desktop Navigation Links - Centered */}
      <nav className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-6">
        {navLinks.map((link: NavLink) => {
          const isActive = pathname === link.href || (link.href !== '/discover' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle Button */}
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
