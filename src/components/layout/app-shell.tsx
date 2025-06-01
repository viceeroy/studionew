
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // SidebarFooter, // Removed
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/logo';
import { navLinks, type NavLink } from './nav-links';
// import { Button } from '@/components/ui/button'; // No longer needed here
// import { LogOut } from 'lucide-react'; // No longer needed here
import { Header } from './header';
import { BottomNavBar } from './bottom-nav-bar';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" side="left">
        <SidebarHeader className="p-4">
          <Logo size="sm" />
        </SidebarHeader>
        <SidebarContent>
          {/* Hide main nav links from mobile sheet, show on desktop */}
          <SidebarMenu className="hidden md:flex md:flex-col">
            {navLinks.map((link: NavLink) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href || (link.href !== '/discover' && pathname.startsWith(link.href))}
                    tooltip={{ children: link.tooltip, className: "font-body" }}
                  >
                    <a>
                      <link.icon />
                      <span>{link.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        {/* SidebarFooter removed */}
      </Sidebar>
      <SidebarInset>
        <Header />
        {/* Add padding-bottom for mobile to avoid overlap with BottomNavBar */}
        <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6 lg:p-8 lg:pb-8">
          {children}
        </main>
        <BottomNavBar />
      </SidebarInset>
    </SidebarProvider>
  );
}
