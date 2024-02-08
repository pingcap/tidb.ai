import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface TextLoaderOptions {
  encoding?: BufferEncoding;
}

const encodings = [
  'ascii',
  'utf-8',
  'utf-16le',
  'ucs-2',
  'base64',
  'base64url',
  'latin1',
  'binary',
  'hex',
] as const satisfies BufferEncoding[];

const identifier = 'rag.loader.text';
const displayName = 'Text loader';
const optionsSchema = z.object({
  encoding: z.enum(encodings).optional(),
});

const textLoaderMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<TextLoaderOptions>;

export default textLoaderMeta;
