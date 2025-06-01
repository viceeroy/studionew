import type { IdentifySpeciesOutput } from '@/ai/flows/identify-species';

export type SpeciesIdentificationResult = IdentifySpeciesOutput;

export interface SpeciesSummary {
  commonName: string;
  latinName: string;
  photoUrl?: string; // Optional, could be a generic icon or specific image
}

export interface UserSummary {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Location {
  lat: number;
  lng: number;
  name?: string;
}

export interface Observation {
  id: string;
  user: UserSummary;
  species?: SpeciesSummary; // Species might not be identified yet or could be a general observation
  identifiedSpeciesDetails?: SpeciesIdentificationResult; // Full details if identified
  photoUrl: string; // URL of the observation photo
  photoDataUri?: string; // Data URI if available locally, for AI processing
  location?: Location;
  biome?: string;
  timestamp: string; // ISO string date
  notes?: string;
}

export interface MapObservation {
  id: string;
  lat: number;
  lng: number;
  title: string; // e.g. species common name
  photoUrl: string;
}

export interface SimilarSpeciesSuggestion {
  name: string;
  latinName: string;
  description: string;
  image: string; // data URI
}

// Extending IdentifySpeciesOutput from the AI flow to be more UI friendly if needed
export interface DisplayableSpeciesDetails extends IdentifySpeciesOutput {
  // any additional UI-specific fields can go here
}
