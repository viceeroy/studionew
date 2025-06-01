'use server';

/**
 * @fileOverview Retrieves detailed information about a specified species using AI.
 *
 * - getSpeciesDetails - A function that retrieves details for a given species.
 * - SpeciesDetailsInput - The input type for the getSpeciesDetails function.
 * - SpeciesDetailsOutput - The return type for the getSpeciesDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpeciesDetailsInputSchema = z.object({
  speciesName: z.string().describe('The common name of the species to look up.'),
});
export type SpeciesDetailsInput = z.infer<typeof SpeciesDetailsInputSchema>;

const SpeciesDetailsOutputSchema = z.object({
  genus: z.string().describe('The genus of the species.'),
  species: z.string().describe('The species of the organism.'),
  habitat: z.string().describe('The typical habitat of the species.'),
  diet: z.string().describe('The diet of the species.'),
  conservationStatus: z
    .string()
    .describe('The conservation status of the species, e.g., Endangered, Vulnerable, Least Concern.'),
  ecologicalRole: z
    .string()
    .describe('The role of the species within its ecological niche.'),
  similarSpecies: z.array(z.string()).describe('List of species similar to the identified species'),
  interestingFact: z.string().describe('An interesting fact about the species.'),
  geographicDistribution: z.string().describe('The primary geographic distribution or country/countries of origin of the species.'),
});
export type SpeciesDetailsOutput = z.infer<typeof SpeciesDetailsOutputSchema>;

export async function getSpeciesDetails(input: SpeciesDetailsInput): Promise<SpeciesDetailsOutput> {
  return speciesDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'speciesDetailsPrompt',
  input: {schema: SpeciesDetailsInputSchema},
  output: {schema: SpeciesDetailsOutputSchema},
  prompt: `You are an expert biologist. Provide detailed information about the species: {{{speciesName}}}.

  Include the following details:
  - Genus
  - Species
  - Habitat
  - Diet
  - Conservation Status
  - Ecological Role
  - Similar Species
  - An interesting fact
  - Geographic Distribution (Countries of origin or primary regions)

  Ensure the information is accurate and comprehensive, and respond using the output schema.`,
});

const speciesDetailsFlow = ai.defineFlow(
  {
    name: 'speciesDetailsFlow',
    inputSchema: SpeciesDetailsInputSchema,
    outputSchema: SpeciesDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
