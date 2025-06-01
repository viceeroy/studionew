'use client';

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import type { MapObservation } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface InteractiveMapProps {
  observations: MapObservation[];
  apiKey: string | undefined; // Google Maps API Key
}

export function InteractiveMap({ observations, apiKey }: InteractiveMapProps) {
  const [selectedObservation, setSelectedObservation] = useState<MapObservation | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 0 }); // Default center
  const [mapZoom, setMapZoom] = useState(2); // Default zoom

  useEffect(() => {
    if (observations.length > 0) {
      // Calculate average lat/lng for initial center or use first observation
      const avgLat = observations.reduce((sum, obs) => sum + obs.lat, 0) / observations.length;
      const avgLng = observations.reduce((sum, obs) => sum + obs.lng, 0) / observations.length;
      setMapCenter({ lat: avgLat || observations[0].lat, lng: avgLng || observations[0].lng });
      setMapZoom(observations.length === 1 ? 10 : 3); // Zoom in if only one observation
    }
  }, [observations]);


  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-muted rounded-lg">
        <p className="text-destructive-foreground bg-destructive p-4 rounded-md">
          Google Maps API Key is missing. Please configure it to use the map feature.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)] min-h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={mapCenter}
          defaultZoom={mapZoom}
          center={mapCenter}
          zoom={mapZoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="semurgNatureMap"
          className="w-full h-full"
        >
          {observations.map((obs) => (
            <AdvancedMarker
              key={obs.id}
              position={{ lat: obs.lat, lng: obs.lng }}
              onClick={() => setSelectedObservation(obs)}
            >
              <Pin
                background={'hsl(var(--primary))'}
                borderColor={'hsl(var(--primary-foreground))'}
                glyphColor={'hsl(var(--primary-foreground))'}
              />
            </AdvancedMarker>
          ))}

          {selectedObservation && (
            <InfoWindow
              position={{ lat: selectedObservation.lat, lng: selectedObservation.lng }}
              onCloseClick={() => setSelectedObservation(null)}
              pixelOffset={[0,-30]}
            >
              <Card className="w-64 shadow-none border-none">
                <CardHeader className="p-2">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={selectedObservation.photoUrl}
                      alt={selectedObservation.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      data-ai-hint="map observation"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-2 text-center">
                  <CardTitle className="font-headline text-base mb-1">{selectedObservation.title}</CardTitle>
                  <Link href={`/species/${encodeURIComponent(selectedObservation.title)}`} passHref>
                    <Button variant="link" size="sm" className="p-0 h-auto">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
