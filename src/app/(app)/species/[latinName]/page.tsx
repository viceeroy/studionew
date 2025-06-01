import { SpeciesDetailView } from '@/components/feature/species/species-detail-view';
import { getSpeciesDetails, type SpeciesDetailsOutput } from '@/ai/flows/species-details';
import { suggestSimilarSpecies, type SuggestSimilarSpeciesOutput } from '@/ai/flows/suggest-similar-species';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { getSpeciesByLatinName, mockObservations } from '@/lib/mock-data'; // Using mock data for base and AI for enhancement
import type { DisplayableSpeciesDetails } from '@/lib/types';

export const revalidate = 3600; // Revalidate page every hour

interface SpeciesPageProps {
  params: {
    latinName: string;
  };
}

// Helper to transform SpeciesDetailsOutput to DisplayableSpeciesDetails
function transformSpeciesDetails(details: SpeciesDetailsOutput, latinName: string): DisplayableSpeciesDetails {
  const commonNameFromLatin = latinName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    identification: {
      commonName: commonNameFromLatin, 
      latinName: latinName,
      genus: details.genus,
      species: details.species,
    },
    habitat: details.habitat,
    diet: details.diet,
    similarSpecies: details.similarSpecies,
    endangeredStatus: details.conservationStatus,
    ecologicalNiche: details.ecologicalRole,
    interestingFact: details.interestingFact,
    geographicDistribution: details.geographicDistribution,
  };
}


export default async function SpeciesPage({ params }: SpeciesPageProps) {
  const decodedLatinName = decodeURIComponent(params.latinName);

  let speciesDetails: DisplayableSpeciesDetails | null = null;
  let similarSpeciesSuggestions: SuggestSimilarSpeciesOutput['similarSpecies'] | null = null;
  let error: string | null = null;
  let originalPhotoUrl: string | undefined = undefined;

  const mockDetail = getSpeciesByLatinName(decodedLatinName);
  if (mockDetail) {
    speciesDetails = mockDetail;
    const linkedObservation = mockObservations.find(obs => obs.identifiedSpeciesDetails?.identification.latinName === decodedLatinName);
    if (linkedObservation) {
        originalPhotoUrl = linkedObservation.photoUrl;
    }
  }

  try {
    const aiSpeciesDetails = await getSpeciesDetails({ speciesName: speciesDetails?.identification.commonName || decodedLatinName });
    if (aiSpeciesDetails) {
        const transformedDetails = transformSpeciesDetails(aiSpeciesDetails, decodedLatinName);
        speciesDetails = {
            ...(speciesDetails || {} as DisplayableSpeciesDetails), 
            ...transformedDetails, 
            identification: {
                ...(speciesDetails?.identification || {}),
                ...transformedDetails.identification,
            },
             // Ensure new fields are explicitly carried over or defaulted if not in transformedDetails for some reason
            interestingFact: transformedDetails.interestingFact || speciesDetails?.interestingFact || '',
            geographicDistribution: transformedDetails.geographicDistribution || speciesDetails?.geographicDistribution || '',
        };
    }
    
    if (speciesDetails) {
      const photoForAISuggestion = originalPhotoUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      
      const suggestionsResult = await suggestSimilarSpecies({
        speciesName: speciesDetails.identification.commonName,
        speciesDescription: `Habitat: ${speciesDetails.habitat}. Diet: ${speciesDetails.diet}. Ecological Niche: ${speciesDetails.ecologicalNiche}.`,
        speciesImage: photoForAISuggestion 
      });
      similarSpeciesSuggestions = suggestionsResult.similarSpecies;
    }

  } catch (e) {
    console.error('Error fetching species data:', e);
    error = e instanceof Error ? e.message : 'Failed to load species information.';
    if (!speciesDetails) {
        // Full error if no mock data either
    } else {
        error = `Could not fetch full AI details, showing available data. Error: ${error}`; 
    }
  }

  if (!speciesDetails && error) {
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
      {error && !similarSpeciesSuggestions && ( /* Show error if AI enhancements failed but base details exist */
         <Alert variant="destructive" className="mb-4 mx-auto max-w-4xl">
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
