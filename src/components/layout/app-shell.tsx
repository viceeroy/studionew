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
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/logo';
import { navLinks, type NavLink } from './nav-links';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Header } from './header'; // Import the new Header

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" side="left">
        <SidebarHeader className="p-4">
          <Logo size="sm" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
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
        <SidebarFooter>
           <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <LogOut className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
