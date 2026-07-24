const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');
const CareerGuideResultSchema = z.object({
  guideTitle: z.string(),
});
console.log(JSON.stringify(zodToJsonSchema(CareerGuideResultSchema, "mySchema"), null, 2));
