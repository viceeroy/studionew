import { DiscoveryFeed } from '@/components/feature/discover/discovery-feed';
import { mockObservations } from '@/lib/mock-data';
// Removed Button, PlusCircle, and Link imports as they are no longer used here

export default function DiscoverPage() {
  // In a real app, fetch observations from a backend
  const observations = mockObservations;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-headline tracking-tight">Discoveries</h1>
        {/* The "New Observation" button was here and has been removed */}
      </div>
      {/* TODO: Add FilterControls component here */}
      <DiscoveryFeed observations={observations} />
    </div>
  );
}
