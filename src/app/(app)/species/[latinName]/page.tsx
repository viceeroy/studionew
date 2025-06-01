import { SpeciesDetailView } from '@/components/feature/species/species-detail-view';
import { getSpeciesDetails, type SpeciesDetailsOutput } from '@/ai/flows/species-details';
import { suggestSimilarSpecies, type SuggestSimilarSpeciesOutput } from '@/ai/flows/suggest-similar-species';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { getSpeciesByLatinName, mockSimilarSpecies } from '@/lib/mock-data'; // Using mock data for base and AI for enhancement

export const revalidate = 3600; // Revalidate page every hour

interface SpeciesPageProps {
  params: {
    latinName: string;
  };
}

// Helper to transform SpeciesDetailsOutput to DisplayableSpeciesDetails
function transformSpeciesDetails(details: SpeciesDetailsOutput, latinName: string): import('@/lib/types').DisplayableSpeciesDetails {
  // Assuming commonName might need to be derived or is part of what user expects
  // For now, we are using latinName from URL to fetch. If commonName is available, use it.
  // The SpeciesDetailsOutput from AI doesn't give commonName directly, it's based on input commonName.
  // We need a way to get the common name if we only have latinName.
  // Let's assume for now the input `speciesName` to `getSpeciesDetails` was the common name.
  // This might be a limitation if we only navigate by latin name.

  // A practical approach: If latinName is the primary ID, we might need a lookup for commonName
  // or the AI flow should return it based on latinName too.
  // For mock, we can try to find it.
  const commonNameFromLatin = latinName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


  return {
    identification: {
      commonName: commonNameFromLatin, // This is an assumption, better if AI returns it
      latinName: latinName,
      genus: details.genus,
      species: details.species,
    },
    habitat: details.habitat,
    diet: details.diet,
    similarSpecies: details.similarSpecies, // This is from getSpeciesDetails
    endangeredStatus: details.conservationStatus,
    ecologicalNiche: details.ecologicalRole,
  };
}


export default async function SpeciesPage({ params }: SpeciesPageProps) {
  const decodedLatinName = decodeURIComponent(params.latinName);

  let speciesDetails: import('@/lib/types').DisplayableSpeciesDetails | null = null;
  let similarSpeciesSuggestions: SuggestSimilarSpeciesOutput['similarSpecies'] | null = null;
  let error: string | null = null;
  let originalPhotoUrl: string | undefined = undefined;

  // Try to get base details from mock data first (which might include an original photo)
  const mockDetail = getSpeciesByLatinName(decodedLatinName);
  if (mockDetail) {
    speciesDetails = mockDetail;
    // Attempt to find an observation to get its photo.
    // This is a bit contrived; in a real app, the species entry would have a canonical image.
    const linkedObservation = mockObservations.find(obs => obs.identifiedSpeciesDetails?.identification.latinName === decodedLatinName);
    if (linkedObservation) {
        originalPhotoUrl = linkedObservation.photoUrl;
    }
  }

  try {
    // Enhance with AI data if not fully populated or to get latest
    const aiSpeciesDetails = await getSpeciesDetails({ speciesName: speciesDetails?.identification.commonName || decodedLatinName });
    if (aiSpeciesDetails) {
        const transformedDetails = transformSpeciesDetails(aiSpeciesDetails, decodedLatinName);
        // Merge AI details with mock/base details, AI taking precedence for text fields
        speciesDetails = {
            ...(speciesDetails || {}), // keep existing fields like commonName if mock had a better one
            ...transformedDetails, // AI data overwrites fields it provides
            identification: {
                ...(speciesDetails?.identification || {}),
                ...transformedDetails.identification,
            }
        };
    }
    
    if (speciesDetails) {
      // Use a placeholder image for similar species suggestion if originalPhotoUrl is not available
      const photoForAISuggestion = originalPhotoUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // 1x1 transparent png
      
      const suggestionsResult = await suggestSimilarSpecies({
        speciesName: speciesDetails.identification.commonName,
        // Combine habitat and diet for a richer description
        speciesDescription: `Habitat: ${speciesDetails.habitat}. Diet: ${speciesDetails.diet}. Ecological Niche: ${speciesDetails.ecologicalNiche}.`,
        speciesImage: photoForAISuggestion 
      });
      similarSpeciesSuggestions = suggestionsResult.similarSpecies;
    }

  } catch (e) {
    console.error('Error fetching species data:', e);
    error = e instanceof Error ? e.message : 'Failed to load species information.';
    // If AI fails but we have mock data, we can still show that
    if (!speciesDetails) {
        // If AI failed AND no mock data, then it's a full error.
    } else {
        error = `Could not fetch full AI details, showing available data. Error: ${error}`; // Partial error
    }
  }

  if (!speciesDetails && error) {
    // If AI fails and no mock data was found
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTitle>Error Loading Species</AlertTitle>
          <AlertDescription>{error || 'The requested species could not be found or there was an issue fetching its details.'}</AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/discover"><Home className="mr-2 h-4 w-4" /> Back to Discover</Link>
        </Button>
      </div>
    );
  }
  
  if (!speciesDetails) {
     return (
      <div className="container mx-auto py-8 px-4 text-center">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTitle>Species Not Found</AlertTitle>
          <AlertDescription>The requested species data is unavailable.</AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/discover"><Home className="mr-2 h-4 w-4" /> Back to Discover</Link>
        </Button>
      </div>
    );
  }


  return (
    <div>
      {error && !speciesDetails && ( /* Show error only if no details at all */
         <Alert variant="destructive" className="mb-4">
          <AlertTitle>Partial Data Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <SpeciesDetailView 
        species={speciesDetails} 
        similarSpeciesSuggestions={similarSpeciesSuggestions || undefined}
        originalPhotoUrl={originalPhotoUrl}
      />
    </div>
  );
}

// For mock data, if speciesDetails from AI does not return similarSpecies (plural),
// but SpeciesDetailView expects it, mockSimilarSpecies (plural) is not used currently in the logic path.
// The AI flow 'species-details.ts' (getSpeciesDetails) returns `similarSpecies: z.array(z.string())`.
// The AI flow 'suggest-similar-species.ts' (suggestSimilarSpecies) returns rich objects for similar species.
// I've used the latter for `similarSpeciesSuggestions` and the former is part of `speciesDetails.similarSpecies`.
// The UI component `SpeciesDetailView` distinguishes these.
