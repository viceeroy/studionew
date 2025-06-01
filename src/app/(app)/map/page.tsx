import { InteractiveMap } from '@/components/feature/map/interactive-map';
import { mockMapObservations } from '@/lib/mock-data'; // Using mock data for now

export default function MapPage() {
  const observations = mockMapObservations;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Explore Biodiversity</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-xl mx-auto">
          Discover where species have been observed around the world. Click on a pin to learn more.
        </p>
      </header>
      <InteractiveMap observations={observations} apiKey={apiKey} />
       {!apiKey && (
        <p className="text-center text-sm text-destructive mt-4">
          Note: The map requires a Google Maps API key to be configured in environment variables (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).
        </p>
      )}
    </div>
  );
}
