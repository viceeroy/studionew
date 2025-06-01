import { Leaf } from 'lucide-react';
import Link from 'next/link';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSizeClass = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl';
  const iconSizeClass = size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-7 w-7' : 'h-8 w-8';

  return (
    <Link href="/discover" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
      <Leaf className={iconSizeClass} />
      <span className={`font-headline font-semibold ${textSizeClass}`}>
        Semurg
      </span>
    </Link>
  );
}
