import { DiscoveryFeed } from '@/components/feature/discover/discovery-feed';
import { mockObservations } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function DiscoverPage() {
  // In a real app, fetch observations from a backend
  const observations = mockObservations;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-headline tracking-tight">Discoveries</h1>
        <Link href="/identify">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Observation
            </Button>
        </Link>
      </div>
      {/* TODO: Add FilterControls component here */}
      <DiscoveryFeed observations={observations} />
    </div>
  );
}
