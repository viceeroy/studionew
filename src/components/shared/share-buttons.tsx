
'use client';

import { Button } from '@/components/ui/button';
import { Share2, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const { toast } = useToast();

  const handleShareDiscovery = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: title, // You might want a more specific text
          url: url,
        });
        toast({ title: "Discovery Shared", description: "Link copied to clipboard or shared." });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({ title: "Sharing Failed", description: "Could not share the discovery.", variant: "destructive" });
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(`${title} - ${url}`);
        toast({ title: "Link Copied!", description: "Discovery link copied to clipboard." });
      } catch (error) {
         toast({ title: "Copy Failed", description: "Could not copy link to clipboard.", variant: "destructive" });
      }
    }
  };

  const handleAddToCollection = () => {
    // Placeholder functionality
    toast({
      title: "Coming Soon!",
      description: "Adding to collections will be available in a future update.",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShareDiscovery}
        className="gap-2"
        aria-label="Share Discovery"
      >
        <Share2 className="h-4 w-4" />
        <span>Share Discovery</span>
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
