
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
    const currentTheme = document.documentElement.classList.contains('dark');
    setIsDarkMode(currentTheme);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };
  
  // Simplified placeholder for SSR
  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border px-4 md:px-6 w-full">
        <div className="h-8 w-20 rounded-md bg-muted animate-pulse" /> {/* Placeholder for Logo */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex h-8 w-48 rounded-md bg-muted animate-pulse" /> {/* Placeholder for nav links */}
          <div className="h-8 w-8 rounded-full bg-muted animate-pulse" /> {/* Placeholder for theme button */}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border px-4 md:px-6 w-full bg-background">
      {/* Left side: Logo */}
      <div className="flex items-center">
        <Logo size="sm" />
      </div>

      {/* Right side: Desktop Navigation Links & Theme Toggle for all screens */}
      <div className="flex items-center gap-x-2 lg:gap-x-4">
        <nav className="hidden md:flex items-center gap-x-1 lg:gap-x-2">
          {navLinks.map((link: NavLink) => {
            const isActive = pathname === link.href || (link.href !== '/discover' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-accent/80 hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <link.icon className={cn("h-4 w-4", isActive ? "text-accent-foreground" : "")} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
