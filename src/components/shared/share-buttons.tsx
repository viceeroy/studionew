
'use client';

import { Button } from '@/components/ui/button';
import { Compass, Bookmark } from 'lucide-react'; // Changed Share2 to Compass
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { addObservation, mockUser } from '@/lib/mock-data'; // Import addObservation and mockUser
import type { SpeciesIdentificationResult, DisplayableSpeciesDetails } from '@/lib/types';

interface ShareButtonsProps {
  // url and title are no longer directly used for sharing in the new implementation, 
  // but kept for potential future use or if Web Share API fallback needs them.
  url: string;
  title: string;
  // New props for creating an observation
  speciesData?: SpeciesIdentificationResult | DisplayableSpeciesDetails;
  originalPhotoUrl?: string;
}

export function ShareButtons({ url, title, speciesData, originalPhotoUrl }: ShareButtonsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleShareToDiscovery = async () => {
    if (!speciesData || !originalPhotoUrl) {
      toast({
        title: "Cannot Share",
        description: "Not enough information to share this discovery.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Ensure speciesData conforms to SpeciesIdentificationResult for addObservation
      const detailsToSave: SpeciesIdentificationResult = {
        ...speciesData, // Spread existing data
        // Ensure all fields of SpeciesIdentificationResult are present
        // Most fields should already exist if speciesData is one of the expected types
        // This explicit spread helps satisfy TypeScript if types slightly diverge
      };

      addObservation({
        identifiedSpeciesDetails: detailsToSave,
        photoUrl: originalPhotoUrl,
        notes: `Shared: ${detailsToSave.identification.commonName}`,
      });

      toast({
        title: "Shared to Discovery!",
        description: `${detailsToSave.identification.commonName} has been added to the discovery feed.`,
      });
      router.push('/discover'); // Navigate to discover page to see the new post
      router.refresh(); // Force refresh to ensure new data is loaded on discover page

    } catch (error) {
      console.error('Error sharing to discovery:', error);
      toast({
        title: "Sharing Failed",
        description: "Could not share this discovery. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddToCollection = () => {
    if (speciesData) {
      toast({
        title: "Added to Collection (Placeholder)",
        description: `${speciesData.identification.commonName} would be saved to your profile's collection. This feature is coming soon!`,
      });
    } else {
       toast({
        title: "Coming Soon!",
        description: "Adding to collections will be available in a future update.",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShareToDiscovery}
        className="gap-2"
        aria-label="Share to Discovery Feed"
        disabled={!speciesData || !originalPhotoUrl} // Disable if no data to share
      >
        <Compass className="h-4 w-4" />
        <span>Share to Discovery</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddToCollection}
        className="gap-2"
        aria-label="Add to Collection"
      >
        <Bookmark className="h-4 w-4" />
        <span>Add to Collection</span>
      </Button>
    </div>
  );
}

    