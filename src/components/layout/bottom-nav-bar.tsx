
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, type NavLink } from './nav-links';
import { cn } from '@/lib/utils';

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 block border-t border-border bg-background p-1 md:hidden">
      <div className="mx-auto flex h-14 max-w-md items-center justify-around">
        {navLinks.map((link: NavLink) => {
          const isActive = pathname === link.href || (link.href !== '/discover' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 rounded-md p-1 text-xs transition-colors',
                isActive
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <link.icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
