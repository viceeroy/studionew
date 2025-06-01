'use server';

/**
 * @fileOverview An AI agent that identifies the species of a plant or animal from a photo.
 *
 * - identifySpecies - A function that handles the species identification process.
 * - IdentifySpeciesInput - The input type for the identifySpecies function.
 * - IdentifySpeciesOutput - The return type for the identifySpecies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifySpeciesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant or animal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifySpeciesInput = z.infer<typeof IdentifySpeciesInputSchema>;

const IdentifySpeciesOutputSchema = z.object({
  identification: z.object({
    commonName: z.string().describe('The common name of the identified species.'),
    latinName: z.string().describe('The Latin name of the identified species.'),
    genus: z.string().describe('The genus of the identified species.'),
    species: z.string().describe('The species of the identified species.'),
  }),
  habitat: z.string().describe('The habitat of the identified species.'),
  diet: z.string().describe('The diet of the identified species.'),
  similarSpecies: z.array(z.string()).describe('A list of similar species.'),
  endangeredStatus: z.string().describe('The endangered status of the identified species, if any.'),
  ecologicalNiche: z.string().describe('The role of the species within its immediate ecological niche.'),
});
export type IdentifySpeciesOutput = z.infer<typeof IdentifySpeciesOutputSchema>;

export async function identifySpecies(input: IdentifySpeciesInput): Promise<IdentifySpeciesOutput> {
  return identifySpeciesFlow(input);
}

const identifySpeciesPrompt = ai.definePrompt({
  name: 'identifySpeciesPrompt',
  input: {schema: IdentifySpeciesInputSchema},
  output: {schema: IdentifySpeciesOutputSchema},
  prompt: `You are an expert in identifying plant and animal species.

You will use the provided photo to identify the species, and provide information about its habitat, diet, similar species, endangered status (if any), and its role within its immediate ecological niche.

Analyze the following photo to identify the species:

Photo: {{media url=photoDataUri}}`,
});

const identifySpeciesFlow = ai.defineFlow(
  {
    name: 'identifySpeciesFlow',
    inputSchema: IdentifySpeciesInputSchema,
    outputSchema: IdentifySpeciesOutputSchema,
  },
  async input => {
    const {output} = await identifySpeciesPrompt(input);
    return output!;
  }
);
