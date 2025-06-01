import type { Observation, UserSummary, SpeciesSummary, Location, MapObservation, DisplayableSpeciesDetails, SimilarSpeciesSuggestion } from './types';

export const mockUser: UserSummary = {
  id: 'user123',
  name: 'Nature Explorer',
  avatarUrl: 'https://placehold.co/100x100.png',
};

const commonLocations: Location[] = [
  { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, USA' },
  { lat: 40.7128, lng: -74.0060, name: 'New York, USA' },
  { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
  { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia' },
  { lat: 35.6895, lng: 139.6917, name: 'Tokyo, Japan' },
];

const sampleSpecies: SpeciesSummary[] = [
  { commonName: 'Monarch Butterfly', latinName: 'Danaus plexippus', photoUrl: 'https://placehold.co/300x200.png?a=1' },
  { commonName: 'Oak Tree', latinName: 'Quercus robur', photoUrl: 'https://placehold.co/300x200.png?a=2' },
  { commonName: 'Red Fox', latinName: 'Vulpes vulpes', photoUrl: 'https://placehold.co/300x200.png?a=3' },
  { commonName: 'Sunflower', latinName: 'Helianthus annuus', photoUrl: 'https://placehold.co/300x200.png?a=4' },
  { commonName: 'European Robin', latinName: 'Erithacus rubecula', photoUrl: 'https://placehold.co/300x200.png?a=5' },
];

export const mockObservations: Observation[] = [
  {
    id: 'obs1',
    user: mockUser,
    species: sampleSpecies[0],
    identifiedSpeciesDetails: {
      identification: {
        commonName: sampleSpecies[0].commonName,
        latinName: sampleSpecies[0].latinName,
        genus: 'Danaus',
        species: 'plexippus',
      },
      habitat: 'Open fields, meadows, and gardens with milkweed plants.',
      diet: 'Nectar from various flowers as adults; milkweed leaves as larvae.',
      similarSpecies: ['Viceroy Butterfly', 'Queen Butterfly'],
      endangeredStatus: 'Endangered (IUCN Red List, specific populations)',
      ecologicalNiche: 'Pollinator, herbivore (larvae), important food source for some predators.',
    },
    photoUrl: 'https://placehold.co/600x400.png?id=obs1',
    location: commonLocations[0],
    biome: 'Temperate Grassland',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    notes: 'Spotted this beautiful Monarch during a hike.',
  },
  {
    id: 'obs2',
    user: { id: 'user456', name: 'Wilderness Wanderer', avatarUrl: 'https://placehold.co/100x100.png?u=2' },
    species: sampleSpecies[1],
    identifiedSpeciesDetails: {
      identification: {
        commonName: sampleSpecies[1].commonName,
        latinName: sampleSpecies[1].latinName,
        genus: 'Quercus',
        species: 'robur',
      },
      habitat: 'Broadleaf woodlands, forests, and parks.',
      diet: 'Photosynthesis; absorbs nutrients from the soil.',
      similarSpecies: ['White Oak', 'Sessile Oak'],
      endangeredStatus: 'Least Concern',
      ecologicalNiche: 'Provides habitat and food for numerous species, soil stabilization, carbon sequestration.',
    },
    photoUrl: 'https://placehold.co/600x400.png?id=obs2',
    location: commonLocations[1],
    biome: 'Temperate Deciduous Forest',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    notes: 'Majestic old Oak tree in Central Park.',
  },
  {
    id: 'obs3',
    user: mockUser,
    species: sampleSpecies[2],
    identifiedSpeciesDetails: {
      identification: {
        commonName: sampleSpecies[2].commonName,
        latinName: sampleSpecies[2].latinName,
        genus: 'Vulpes',
        species: 'vulpes',
      },
      habitat: 'Forests, grasslands, mountains, and even urban areas.',
      diet: 'Omnivore: small mammals, birds, insects, fruits, and carrion.',
      similarSpecies: ['Arctic Fox', 'Gray Fox'],
      endangeredStatus: 'Least Concern',
      ecologicalNiche: 'Predator, helps control rodent populations, seed disperser.',
    },
    photoUrl: 'https://placehold.co/600x400.png?id=obs3',
    location: commonLocations[2],
    biome: 'Urban Woodland',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    notes: 'A fleeting glimpse of a Red Fox in a London park.',
  },
    {
    id: 'obs4',
    user: { id: 'user789', name: 'Botanist Ben', avatarUrl: 'https://placehold.co/100x100.png?u=3' },
    species: sampleSpecies[3],
    photoUrl: 'https://placehold.co/600x400.png?id=obs4',
    location: commonLocations[3],
    biome: 'Cultivated Field',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    notes: 'Bright sunflowers in a field.',
  },
  {
    id: 'obs5',
    user: mockUser,
    species: sampleSpecies[4],
    photoUrl: 'https://placehold.co/600x400.png?id=obs5',
    location: commonLocations[4],
    biome: 'Garden',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    notes: 'A friendly robin visited my garden.',
  },
];

export const mockMapObservations: MapObservation[] = mockObservations
  .filter(obs => obs.location && obs.species)
  .map(obs => ({
    id: obs.id,
    lat: obs.location!.lat,
    lng: obs.location!.lng,
    title: obs.species!.commonName,
    photoUrl: obs.photoUrl,
  }));

export const mockSpeciesDetail: DisplayableSpeciesDetails = {
  identification: {
    commonName: 'Monarch Butterfly',
    latinName: 'Danaus plexippus',
    genus: 'Danaus',
    species: 'plexippus',
  },
  habitat: 'Open fields, meadows, and gardens with milkweed plants. They are known for their long-distance seasonal migration.',
  diet: 'Adults primarily feed on nectar from a variety of flowers, especially milkweed, lilac, and goldenrod. Larvae (caterpillars) feed exclusively on milkweed leaves.',
  similarSpecies: ['Viceroy Butterfly (Limenitis archippus)', 'Queen Butterfly (Danaus gilippus)', 'Soldier Butterfly (Danaus eresimus)'],
  endangeredStatus: 'Endangered (IUCN Red List, North American migratory populations). Threats include habitat loss (especially milkweed), pesticide use, and climate change.',
  ecologicalNiche: 'Pollinator of various flowering plants. Larvae are herbivores, specialized on milkweed. Serves as a food source for birds, insects, and spiders. Their toxicity from milkweed provides defense against some predators.',
};

export const mockSimilarSpecies: SimilarSpeciesSuggestion[] = [
  {
    name: 'Viceroy Butterfly',
    latinName: 'Limenitis archippus',
    description: 'The Viceroy is a Batesian mimic of the Monarch, meaning it looks similar to deter predators. It is slightly smaller and has an extra black line across its hindwings.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' // Placeholder
  },
  {
    name: 'Queen Butterfly',
    latinName: 'Danaus gilippus',
    description: 'The Queen is closely related to the Monarch and shares similar habitats. It is typically more brownish-orange and has white spots on its forewings that are less prominent than the Monarch\'s.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' // Placeholder
  }
];

export function getObservationById(id: string): Observation | undefined {
  return mockObservations.find(obs => obs.id === id);
}

export function getSpeciesByLatinName(latinName: string): DisplayableSpeciesDetails | undefined {
  const obs = mockObservations.find(o => o.identifiedSpeciesDetails?.identification.latinName === latinName);
  if (obs && obs.identifiedSpeciesDetails) return obs.identifiedSpeciesDetails;
  if (latinName === mockSpeciesDetail.identification.latinName) return mockSpeciesDetail; // Default mock
  return undefined;
}
