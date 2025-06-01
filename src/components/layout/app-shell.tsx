
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  // SidebarMenu, // Removed as nav links moved to header for desktop
  // SidebarMenuItem, // No longer needed here
  // SidebarMenuButton, // No longer needed here
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/logo';
// import { navLinks, type NavLink } from './nav-links'; // navLinks no longer used directly in sidebar menu
import { Header } from './header';
import { BottomNavBar } from './bottom-nav-bar';
// import { cn } from '@/lib/utils'; // cn might not be needed here anymore

export function AppShell({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname(); // pathname might not be needed here if sidebar menu is gone

  return (
    <SidebarProvider defaultOpen>
      {/* The desktop sidebar now primarily serves as a collapsible logo container */}
      <Sidebar variant="sidebar" collapsible="icon" side="left" className="hidden md:flex">
        <SidebarHeader className="p-4">
          <Logo size="sm" />
        </SidebarHeader>
        <SidebarContent>
          {/* Main nav links have been moved to the Header for desktop view */}
          {/* <SidebarMenu className="hidden md:flex md:flex-col">
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
          </SidebarMenu> */}
        </SidebarContent>
      </Sidebar>
      
      {/* This div ensures mobile still gets a logo at the top left, as the sidebar is hidden.
          The Header component itself doesn't have the logo by default.
      */}
      <div className="md:hidden fixed top-0 left-0 p-4 z-50">
          <Logo size="sm" />
      </div>

      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 pb-20 pt-20 md:pt-6 md:p-6 md:pb-6 lg:p-8 lg:pb-8">
          {children}
        </main>
        <BottomNavBar />
      </SidebarInset>
    </SidebarProvider>
  );
}
