import { rag } from '@/core/interface';
import { env } from '@/lib/zod-extensions/types/env';
import { z } from 'zod';
import Readme from './readme.mdx';

const identifier = 'rag.document-storage.fs';
const displayName = 'File system storage';
const optionsSchema = z.object({
  path: env('DOCUMENT_STORE_PATH'),
});

export type FileSystemDocumentStorageOptions = z.infer<typeof optionsSchema>;

const fileSystemDocumentStorageMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<FileSystemDocumentStorageOptions>

export default fileSystemDocumentStorageMeta;
