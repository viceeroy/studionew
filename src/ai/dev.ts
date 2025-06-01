import { config } from 'dotenv';
config();

import '@/ai/flows/identify-species.ts';
import '@/ai/flows/species-details.ts';
import '@/ai/flows/generate-ecological-niche.ts';
import '@/ai/flows/suggest-similar-species.ts';