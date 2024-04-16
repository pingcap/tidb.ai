import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

const identifier = 'rag.document-storage.vercel-blob';
const displayName = 'Vercel Blob';
const optionsSchema = z.object({
  token: z.string().optional(),
  prefix: z.string().optional(),
});

export type VercelBlobDocumentStorageOptions = z.infer<typeof optionsSchema>;

const vercelBlobDocumentStorageMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<VercelBlobDocumentStorageOptions>;

export default vercelBlobDocumentStorageMeta;
