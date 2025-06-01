import type { LucideIcon } from 'lucide-react';
import { Compass, Camera, User, Sparkles } from 'lucide-react'; // Removed Map icon

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip: string;
}

export const navLinks: NavLink[] = [
  {
    href: '/discover',
    label: 'Discover',
    icon: Compass,
    tooltip: 'Discovery Feed',
  },
  {
    href: '/identify',
    label: 'Identify Species',
    icon: Sparkles, // Using Sparkles for AI aspect
    tooltip: 'Identify Species with AI',
  },
  // { // Removed Map link
  //   href: '/map',
  //   label: 'Interactive Map',
  //   icon: Map,
  //   tooltip: 'Explore Observations Map',
  // },
  {
    href: '/profile',
    label: 'My Profile',
    icon: User,
    tooltip: 'Your Profile and Contributions',
  },
];
