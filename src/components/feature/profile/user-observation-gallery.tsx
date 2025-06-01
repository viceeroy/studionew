import Image from 'next/image';
import Link from 'next/link';
import type { Observation } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface UserObservationGalleryProps {
  observations: Observation[];
}

export function UserObservationGallery({ observations }: UserObservationGalleryProps) {
  if (observations.length === 0) {
    return (
      <div className="text-center py-12 md:py-16">
        <div className="inline-flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-foreground mb-4">
          <Camera className="h-10 w-10 md:h-12 md:w-12 text-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Share Photos</h2>
        <p className="text-muted-foreground max-w-xs mx-auto">When you share photos of your discoveries, they will appear on your profile.</p>
        <Button asChild className="mt-6">
          <Link href="/identify">Share your first photo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* <h2 className="text-2xl font-headline mb-4">My Observations</h2> */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
        {observations.map(obs => (
          <Link key={obs.id} href={`/species/${obs.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`} passHref>
            <div className="overflow-hidden group aspect-square bg-muted hover:opacity-90 transition-opacity">
              <div className="relative w-full h-full">
                <Image
                  src={obs.photoUrl}
                  alt={obs.species?.commonName || 'Observation'}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint="observation photo grid"
                />
                {/* Optional: overlay caption, but Instagram style usually doesn't have it on grid view
                {obs.species && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-white text-xs truncate">
                    {obs.species.commonName}
                  </div>
                )} */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
