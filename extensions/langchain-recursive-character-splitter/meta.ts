import { rag } from '@/core/interface';
import { separators } from '@/lib/zod-extensions/types/separator-array';
import type { RecursiveCharacterTextSplitterParams } from 'langchain/text_splitter';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface RecursiveCharacterTextSplitterOptions extends Partial<RecursiveCharacterTextSplitterParams> {
}

const identifier = 'rag.splitter.langchain.recursive-character';
const displayName = 'Recursive Character Text Splitter';
const optionsSchema = z.object({
  separators: separators().optional().default(['\n\n', '\n', ' ', '']),
  chunkSize: z.coerce.number().int().optional().default(512),
  chunkOverlap: z.coerce.number().int().optional().default(10),
  keepSeparator: z.boolean().optional(),
});

const recursiveCharacterTextSplitterMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<RecursiveCharacterTextSplitterOptions>;

export default recursiveCharacterTextSplitterMeta;
