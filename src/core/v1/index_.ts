import { DBv1, getDb } from '@/core/v1/db';
import type { Rewrite } from '@/lib/type-utils';
import type { Selectable } from 'kysely';

export type Index = Rewrite<Selectable<DBv1['index']>, { config: IndexConfig }>;

export interface IndexConfig {
  provider: 'llamaindex';
  reader: Record<string, any>;
  parser: {
    textSplitter?: {
      chunkSize?: number;
      chunkOverlap?: number;
      paragraphSeparator?: string;
      splitLongSentences?: boolean;
    }
    windowSize?: number;
    windowMetadataKey?: string;
    originalTextMetadataKey?: string;
    includeMetadata?: boolean;
    includePrevNextRel?: boolean;
  };
  metadata_extractors: {
    provider: string
    config: any
  }[];
  embedding: {
    provider: string
    config: { model: string }
  };
  llm: {
    provider: string
    config: { model: string }
  };
}

export async function getIndex (id: number) {
  return await getDb()
    .selectFrom('index')
    .selectAll()
    .$castTo<Index>()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function getIndexByName (name: string) {
  return await getDb()
    .selectFrom('index')
    .selectAll()
    .$castTo<Index>()
    .where('name', '=', eb => eb.val(name))
    .executeTakeFirst();
}
