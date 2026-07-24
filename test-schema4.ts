import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { CareerGuideResultSchema } from './lib/gemini/schema';
console.log(JSON.stringify(zodToJsonSchema(CareerGuideResultSchema), null, 2));
