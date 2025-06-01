import type { IdentifySpeciesOutput } from '@/ai/flows/identify-species';

export type SpeciesIdentificationResult = IdentifySpeciesOutput;

export interface SpeciesSummary {
  commonName: string;
  latinName: string;
  photoUrl?: string; 
}

export interface UserSummary {
  id: string;
  username: string; 
  name: string; 
  avatarUrl?: string;
  bio?: string;
  website?: string; 
}

export interface Location {
  lat: number;
  lng: number;
  name?: string;
}

export interface Observation {
  id: string;
  user: UserSummary; 
  species?: SpeciesSummary; 
  identifiedSpeciesDetails?: SpeciesIdentificationResult; 
  photoUrl: string; 
  photoDataUri?: string; 
  location?: Location;
  biome?: string;
  timestamp: string; 
  notes?: string;
}

// Removed MapObservation type as it's no longer needed
// export interface MapObservation {
//   id: string;
//   lat: number;
//   lng: number;
//   title: string; 
//   photoUrl: string;
// }

export interface SimilarSpeciesSuggestion {
  name: string;
  latinName: string;
  description: string;
  image: string; 
}

export interface DisplayableSpeciesDetails extends IdentifySpeciesOutput {
  // any additional UI-specific fields can go here
}
