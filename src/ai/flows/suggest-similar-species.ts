'use server';

/**
 * @fileOverview Provides suggestions for visually and genetically similar species.
 *
 * - suggestSimilarSpecies - A function that suggests similar species.
 * - SuggestSimilarSpeciesInput - The input type for the suggestSimilarSpecies function.
 * - SuggestSimilarSpeciesOutput - The return type for the suggestSimilarSpecies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSimilarSpeciesInputSchema = z.object({
  speciesName: z.string().describe('The name of the identified species.'),
  speciesDescription: z.string().describe('A detailed description of the identified species including habitat and diet.'),
  speciesImage: z
    .string()
    .describe(
      "A photo of the identified species, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestSimilarSpeciesInput = z.infer<typeof SuggestSimilarSpeciesInputSchema>;

const SuggestSimilarSpeciesOutputSchema = z.object({
  similarSpecies: z
    .array(
      z.object({
        name: z.string().describe('The common name of the similar species.'),
        latinName: z.string().describe('The Latin name of the similar species.'),
        description: z.string().describe('A brief description of the similar species and its similarities.'),
        image: z.string().describe("A data URI of a photo of the similar species, in 'data:<mimetype>;base64,<encoded_data>' format."),
      })
    )
    .describe('A list of species that are visually and genetically similar to the identified species.'),
});
export type SuggestSimilarSpeciesOutput = z.infer<typeof SuggestSimilarSpeciesOutputSchema>;

export async function suggestSimilarSpecies(input: SuggestSimilarSpeciesInput): Promise<SuggestSimilarSpeciesOutput> {
  return suggestSimilarSpeciesFlow(input);
}

const suggestSimilarSpeciesPrompt = ai.definePrompt({
  name: 'suggestSimilarSpeciesPrompt',
  input: {schema: SuggestSimilarSpeciesInputSchema},
  output: {schema: SuggestSimilarSpeciesOutputSchema},
  prompt: `You are an expert biologist familiar with a wide variety of plants and animals.

You will be provided with the name, description, and image of a species.

Based on this information, you will suggest other species that are visually and genetically similar to the identified species, to broaden the user's understanding of related organisms.

Species Name: {{{speciesName}}}
Species Description: {{{speciesDescription}}}
Species Image: {{media url=speciesImage}}

Suggest three visually and genetically similar species.

Each suggestion should include the following:
- The common name of the similar species
- The Latin name of the similar species
- A brief description of the similar species and its similarities
- A data URI of a photo of the similar species, in 'data:<mimetype>;base64,<encoded_data>' format.

Ensure that the image URLs are valid data URIs.

Output in JSON format:
{{output schema=SuggestSimilarSpeciesOutputSchema}}`,
});

const suggestSimilarSpeciesFlow = ai.defineFlow(
  {
    name: 'suggestSimilarSpeciesFlow',
    inputSchema: SuggestSimilarSpeciesInputSchema,
    outputSchema: SuggestSimilarSpeciesOutputSchema,
  },
  async input => {
    const {output} = await suggestSimilarSpeciesPrompt(input);
    return output!;
  }
);
