'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Observation } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Tag, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiscoveryCardProps {
  observation: Observation;
}

export function DiscoveryCard({ observation }: DiscoveryCardProps) {
  const { toast } = useToast();
  const timeAgo = formatDistanceToNow(new Date(observation.timestamp), { addSuffix: true });

  const handleLike = () => {
    toast({ title: 'Like', description: 'Liking functionality coming soon!' });
  };

  const handleComment = () => {
    toast({ title: 'Comment', description: 'Commenting functionality coming soon!' });
  };

  const handleShare = () => {
    // Basic share functionality, can be expanded with Web Share API
    if (navigator.share) {
      navigator.share({
        title: `Check out this ${observation.species?.commonName || 'discovery'}!`,
        text: `Observed by ${observation.user.name}.`,
        url: window.location.origin + `/species/${observation.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      toast({ title: 'Share', description: 'Sharing posts functionality coming soon!' });
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <Link href={`/species/${observation.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`}>
          <div className="relative aspect-[4/3] w-full group"> {/* Changed aspect ratio for a common photo feel */}
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
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center gap-2 mb-2 text-sm">
          <Avatar className="h-8 w-8"> {/* Slightly larger avatar */}
            <AvatarImage src={observation.user.avatarUrl} alt={observation.user.name} data-ai-hint="profile person" />
            <AvatarFallback>{observation.user.name.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <span className="font-semibold">{observation.user.name}</span>
            <span className="text-xs text-muted-foreground block">{timeAgo}</span>
          </div>
        </div>
        <CardTitle className="font-headline text-xl mb-1">
          <Link href={`/species/${observation.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`} className="hover:text-primary transition-colors">
            {observation.species?.commonName || 'Unidentified Species'}
          </Link>
        </CardTitle>
        {observation.species?.latinName && (
          <p className="text-sm text-muted-foreground italic mb-2">{observation.species.latinName}</p>
        )}
        {observation.notes && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{observation.notes}</p>
        )}
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            {observation.location?.name && (
            <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{observation.location.name}</span>
            </div>
            )}
            {observation.biome && (
            <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                <span>{observation.biome}</span>
            </div>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-1.5 px-2 text-muted-foreground hover:text-primary">
                    <Heart className="h-4 w-4" />
                    <span>{observation.likesCount}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleComment} className="flex items-center gap-1.5 px-2 text-muted-foreground hover:text-primary">
                    <MessageCircle className="h-4 w-4" />
                    <span>Comment</span> 
                </Button>
                 <Button variant="ghost" size="sm" onClick={handleShare} className="flex items-center gap-1.5 px-2 text-muted-foreground hover:text-primary">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                </Button>
            </div>
            <Link href={`/species/${observation.identifiedSpeciesDetails?.identification.latinName || 'unknown'}`}>
                <Button variant="outline" size="sm">View Details</Button>
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
