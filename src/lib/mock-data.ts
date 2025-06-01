
import type { Observation, UserSummary, SpeciesSummary, Location, DisplayableSpeciesDetails, SimilarSpeciesSuggestion, SpeciesIdentificationResult } from './types';

export let mockUser: UserSummary = { // Changed to let for potential future modification, though not strictly needed for current change
  id: 'user123',
  username: 'NatureExplorer',
  name: 'Nature Explorer',
  avatarUrl: 'https://placehold.co/150x150.png',
  bio: 'Exploring the wild, one snapshot at a time. 🌿📸 Passionate about biodiversity and conservation. All observations are my own.',
  website: 'https://example.com/nature_explorer_portfolio',
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

const otherUser: UserSummary = {
  id: 'user456',
  username: 'WildernessWanderer',
  name: 'Wilderness Wanderer',
  avatarUrl: 'https://placehold.co/100x100.png?u=2',
  bio: 'Seeking adventures in untouched landscapes.',
};


export let mockObservations: Observation[] = [ // Changed to let so we can add to it
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
      interestingFact: 'Monarch butterflies undertake a remarkable multi-generational migration of up to 3,000 miles.',
      geographicDistribution: 'North America, Central America, and northern South America. Also found in Australia, New Zealand, and some Pacific islands.',
    },
    photoUrl: 'https://placehold.co/600x400.png?id=obs1',
    location: commonLocations[0],
    biome: 'Temperate Grassland',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), 
    notes: 'Spotted this beautiful Monarch during a hike.',
  },
  {
    id: 'obs2',
    user: otherUser,
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
      interestingFact: 'Oak trees can live for hundreds of years, with some specimens known to be over a thousand years old.',
      geographicDistribution: 'Native to most of Europe, and Anatolia to the Caucasus, as well as parts of North Africa.',
    },
    photoUrl: 'https://placehold.co/600x400.png?id=obs2',
    location: commonLocations[1],
    biome: 'Temperate Deciduous Forest',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), 
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
      interestingFact: 'Red foxes have excellent hearing and can reportedly hear a watch ticking from 40 yards away.',
      geographicDistribution: 'Found across the entire Northern Hemisphere including North America, Europe, Asia, and parts of North Africa.',
    },
    photoUrl: 'https://placehold.co/600x400.png?id=obs3',
    location: commonLocations[2],
    biome: 'Urban Woodland',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), 
    notes: 'A fleeting glimpse of a Red Fox in a London park.',
  },
    {
    id: 'obs4',
    user: { id: 'user789', username: 'BotanistBen', name: 'Botanist Ben', avatarUrl: 'https://placehold.co/100x100.png?u=3' },
    species: sampleSpecies[3],
     identifiedSpeciesDetails: {
      identification: {
        commonName: sampleSpecies[3].commonName,
        latinName: sampleSpecies[3].latinName,
        genus: 'Helianthus',
        species: 'annuus',
      },
      habitat: 'Open, sunny areas with well-drained soil. Often cultivated.',
      diet: 'Photosynthesis. Seeds are consumed by birds and mammals.',
      similarSpecies: ['Jerusalem Artichoke', 'Maximilian Sunflower'],
      endangeredStatus: 'Least Concern (wild populations)',
      ecologicalNiche: 'Provides food (seeds, nectar) for wildlife, attracts pollinators.',
      interestingFact: 'Young sunflowers exhibit heliotropism, where the flower heads turn to follow the sun across the sky.',
      geographicDistribution: 'Native to North America, now cultivated worldwide.',
    },
    photoUrl: 'https://placehold.co/600x400.png?id=obs4',
    location: commonLocations[3],
    biome: 'Cultivated Field',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), 
    notes: 'Bright sunflowers in a field.',
  },
  {
    id: 'obs5',
    user: mockUser,
    species: sampleSpecies[4],
     identifiedSpeciesDetails: {
      identification: {
        commonName: sampleSpecies[4].commonName,
        latinName: sampleSpecies[4].latinName,
        genus: 'Erithacus',
        species: 'rubecula',
      },
      habitat: 'Woodlands, parks, gardens, and hedgerows.',
      diet: 'Insects, spiders, worms, seeds, and berries.',
      similarSpecies: ['Nightingale', 'Black Redstart (female)'],
      endangeredStatus: 'Least Concern',
      ecologicalNiche: 'Insectivore, contributes to seed dispersal, common garden bird.',
      interestingFact: 'European Robins are highly territorial and will aggressively defend their territory, sometimes even attacking their own reflection.',
      geographicDistribution: 'Native to Europe, parts of North Africa, and Western Asia.',
    },
    photoUrl: 'https://placehold.co/600x400.png?id=obs5',
    location: commonLocations[4],
    biome: 'Garden',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), 
    notes: 'A friendly robin visited my garden.',
  },
];


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
  interestingFact: 'Monarch butterflies undertake a remarkable multi-generational migration of up to 3,000 miles, with the fourth generation living much longer to make the return journey south.',
  geographicDistribution: 'Primarily North America (Canada, USA, Mexico), but also found in Central America, northern South America, Australia, New Zealand, and some Pacific islands where milkweed has been introduced.',
};

export const mockSimilarSpecies: SimilarSpeciesSuggestion[] = [
  {
    name: 'Viceroy Butterfly',
    latinName: 'Limenitis archippus',
    description: 'The Viceroy is a Batesian mimic of the Monarch, meaning it looks similar to deter predators. It is slightly smaller and has an extra black line across its hindwings.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' 
  },
  {
    name: 'Queen Butterfly',
    latinName: 'Danaus gilippus',
    description: 'The Queen is closely related to the Monarch and shares similar habitats. It is typically more brownish-orange and has white spots on its forewings that are less prominent than the Monarch\'s.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' 
  }
];

export function getObservationById(id: string): Observation | undefined {
  return mockObservations.find(obs => obs.id === id);
}

export function getSpeciesByLatinName(latinName: string): DisplayableSpeciesDetails | undefined {
  const obs = mockObservations.find(o => o.identifiedSpeciesDetails?.identification.latinName === latinName);
  if (obs && obs.identifiedSpeciesDetails) return obs.identifiedSpeciesDetails;
  if (latinName === mockSpeciesDetail.identification.latinName) return mockSpeciesDetail; 
  return undefined;
}

// Function to add a new observation to the mock data
export function addObservation(data: {
  identifiedSpeciesDetails: SpeciesIdentificationResult;
  photoUrl: string;
  notes?: string;
  location?: Location;
  biome?: string;
}): void {
  const newId = `obs${mockObservations.length + 1}_${Date.now()}`;
  const newObservation: Observation = {
    id: newId,
    user: mockUser, // Using the default mockUser for new posts
    species: {
      commonName: data.identifiedSpeciesDetails.identification.commonName,
      latinName: data.identifiedSpeciesDetails.identification.latinName,
      // photoUrl for species summary could be the same as observation photoUrl or a generic one
    },
    identifiedSpeciesDetails: data.identifiedSpeciesDetails,
    photoUrl: data.photoUrl,
    location: data.location || commonLocations[Math.floor(Math.random() * commonLocations.length)], // Default to a random location if not provided
    biome: data.biome || 'Mixed Habitat', // Default biome
    timestamp: new Date().toISOString(),
    notes: data.notes || `Observation of ${data.identifiedSpeciesDetails.identification.commonName}.`,
  };
  mockObservations.unshift(newObservation); // Add to the beginning of the array
}

    