import { rag } from '@/core/interface';
import { env } from '@/lib/zod-extensions/types/env';
import { z } from 'zod';
import Readme from './readme.mdx';

const identifier = 'rag.document-storage.vercel-blob';
const displayName = 'Vercel Blob';
const optionsSchema = z.object({
  token: env('VERCEL_BLOB_STORAGE_TOKEN'),
  prefix: env('VERCEL_BLOB_STORAGE_PREFIX').optional(),
});

export type VercelBlobDocumentStorageOptions = z.infer<typeof optionsSchema>;

const vercelBlobDocumentStorageMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<VercelBlobDocumentStorageOptions>;

export default vercelBlobDocumentStorageMeta;
