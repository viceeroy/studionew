import type { Observation } from '@/lib/types';
import { DiscoveryCard } from './discovery-card';

interface DiscoveryFeedProps {
  observations: Observation[];
}

export function DiscoveryFeed({ observations }: DiscoveryFeedProps) {
  if (!observations || observations.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No discoveries yet. Be the first to share!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {observations.map(obs => (
        <DiscoveryCard key={obs.id} observation={obs} />
      ))}
    </div>
  );
}
