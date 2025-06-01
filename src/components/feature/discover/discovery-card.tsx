import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Observation } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Tag } from 'lucide-react';

interface DiscoveryCardProps {
  observation: Observation;
}

export function DiscoveryCard({ observation }: DiscoveryCardProps) {
  const timeAgo = formatDistanceToNow(new Date(observation.timestamp), { addSuffix: true });

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/species/${observation.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`}>
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={observation.photoUrl}
              alt={observation.species?.commonName || 'Observation'}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="nature wildlife"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="font-headline text-xl mb-2">
          <Link href={`/species/${observation.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`} className="hover:text-primary transition-colors">
            {observation.species?.commonName || 'Unidentified Species'}
          </Link>
        </CardTitle>
        {observation.species?.latinName && (
          <p className="text-sm text-muted-foreground italic mb-3">{observation.species.latinName}</p>
        )}
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={observation.user.avatarUrl} alt={observation.user.name} data-ai-hint="profile person" />
            <AvatarFallback>{observation.user.name.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <span>{observation.user.name}</span>
          <span>&bull;</span>
          <span>{timeAgo}</span>
        </div>
        {observation.location?.name && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <MapPin className="h-3 w-3" />
            <span>{observation.location.name}</span>
          </div>
        )}
        {observation.biome && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            <span>{observation.biome}</span>
          </div>
        )}
        {observation.notes && (
          <p className="text-sm mt-2 line-clamp-2">{observation.notes}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 flex justify-end">
        <Link href={`/species/${observation.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
