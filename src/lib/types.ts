import type { IdentifySpeciesOutput as GenkitIdentifySpeciesOutput } from '@/ai/flows/identify-species';

// Explicitly define IdentifySpeciesOutput to ensure new fields are part of the type
export interface IdentifySpeciesOutput extends GenkitIdentifySpeciesOutput {
  identification: {
    commonName: string;
    latinName: string;
    genus: string;
    species: string;
  };
  habitat: string;
  diet: string;
  similarSpecies: string[];
  endangeredStatus: string;
  ecologicalNiche: string;
  interestingFact: string;
  geographicDistribution: string;
}

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

export interface SimilarSpeciesSuggestion {
  name: string;
  latinName: string;
  description: string;
  image: string; 
}

export interface DisplayableSpeciesDetails extends IdentifySpeciesOutput {
  // any additional UI-specific fields can go here
}
