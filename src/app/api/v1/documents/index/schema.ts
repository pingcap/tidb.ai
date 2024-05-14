import {z} from "zod";

export const BuildDocumentIndexOptionsSchema = z.object({
  documentIds: z.coerce.number()
    .int()
    .array()
    .min(1, 'Must provide at least one document'),
  indexName: z.string(),
  runInBackground: z.boolean().default(false)
});

export type BuildDocumentIndexOptions = z.infer<typeof BuildDocumentIndexOptionsSchema>;
