import Image from 'next/image';
import Link from 'next/link';
import type { Observation } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface UserObservationGalleryProps {
  observations: Observation[];
}

export function UserObservationGallery({ observations }: UserObservationGalleryProps) {
  if (observations.length === 0) {
    return (
      <Card className="py-8">
        <CardContent className="text-center text-muted-foreground">
          <p>No observations shared yet.</p>
          <Link href="/identify" className="text-primary hover:underline">
            Make your first observation!
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-headline mb-4">My Observations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {observations.map(obs => (
          <Link key={obs.id} href={`/species/${obs.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`} passHref>
            <Card className="overflow-hidden group aspect-square hover:shadow-lg transition-shadow">
              <div className="relative w-full h-full">
                <Image
                  src={obs.photoUrl}
                  alt={obs.species?.commonName || 'Observation'}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint="observation photo"
                />
                {obs.species && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-xs truncate">
                    {obs.species.commonName}
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
