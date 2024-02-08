import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface PdfLoaderOptions {
}

const identifier = 'rag.loader.pdf';
const displayName = 'PDF loader';
const optionsSchema = z.object({});

const pdfLoaderMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<PdfLoaderOptions>;

export default pdfLoaderMeta;
