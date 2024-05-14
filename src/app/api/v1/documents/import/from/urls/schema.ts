import {z} from "zod";

export const ImportDocumentsFromUrlsOptionsSchema = z.object({
  urls: z.string()
    .url('The format of URL is incorrect.')
    .array()
    .min(1, 'Must provide at least one URL for importing.')
});

export type ImportDocumentsFromUrlsOptions = z.infer<typeof ImportDocumentsFromUrlsOptionsSchema>;