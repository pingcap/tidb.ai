import { DBv1, getDb } from '@/core/db';
import { executePage, type PageRequest } from '@/lib/database';
import {INDEX_NOT_FOUND_ERROR} from "@/lib/errors";
import type { Rewrite } from '@/lib/type-utils';
import { type Insertable, type Selectable, sql } from 'kysely';
import { notFound } from 'next/navigation';

export type Index = Rewrite<Selectable<DBv1['index']>, { config: IndexConfig }>;
export type CreateIndex = Rewrite<Insertable<DBv1['index']>, { config: IndexConfig }>;

export enum IndexProviderName {
  LLAMAINDEX = 'llamaindex',
}

export const DEFAULT_INDEX_PROVIDER_NAME = IndexProviderName.LLAMAINDEX;

export interface IndexConfig {
  provider: IndexProviderName;
  reader: Record<string, any>;
  parser: {
    textSplitter?: {
      chunkSize?: number;
      chunkOverlap?: number;
      paragraphSeparator?: string;
      splitLongSentences?: boolean;
    }
  };
  metadata_extractors: {
    provider: string
    config: any
  }[];
  embedding: {
    provider: string
    config: {
      model: string,
      vectorColumn: string,
      vectorDimension: number
    }
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

export async function listIndexes (requiest: PageRequest) {
  return await executePage(getDb()
    .selectFrom('index')
    .selectAll()
    .$castTo<Index>(), requiest);
}

export async function getIndexByName (name: string) {
  return await getDb()
    .selectFrom('index')
    .selectAll()
    .$castTo<Index>()
    .where('name', '=', eb => eb.val(name))
    .executeTakeFirst();
}

export async function getIndexByNameOrThrow(name: string): Promise<Index> {
  const index = await getIndexByName(name);
  if (!index) {
    throw INDEX_NOT_FOUND_ERROR;
  }
  return index;
}

export async function createIndex ({ config, ...create }: CreateIndex) {
  await getDb()
    .insertInto('index')
    .values({
      ...create,
      config: JSON.stringify(config),
    })
    .execute();

  return (await getIndex(create.id))!;
}

export async function enableIndex (id: number) {
  const index = await getIndex(id);
  if (!index) {
    notFound();
  }
  if (index.config.provider !== 'llamaindex') {
    throw new Error(`index type ${index.config.provider} not supported`);
  }

  if (index.configured) {
    throw new Error(`index ${index.name} already enabled`);
  }

  await sql`
      CREATE TABLE IF NOT EXISTS ${sql.raw(`${index.config.provider}_document_chunk_node_${index.name}`)}
      (
          -- Text Node Common Fields
          id          BINARY(16)   NOT NULL,
          hash        VARCHAR(256) NOT NULL,
          text        TEXT         NOT NULL,
          metadata    JSON         NOT NULL,
          embedding   VECTOR< FLOAT >(${index.config.embedding.config.vectorDimension}) NULL COMMENT 'hnsw(distance=cosine)',
          -- Extra Document Chunk Node Fields
          index_id    INT          NOT NULL,
          document_id INT          NOT NULL,
          PRIMARY KEY (id),
          KEY idx_ldcn_on_index_id_document_id (index_id, document_id),
          FOREIGN KEY fk_ldcn_on_index_id (index_id) REFERENCES \`index\` (id),
          FOREIGN KEY fk_ldcn_on_document_id (document_id) REFERENCES \`document\` (id)
      );
  `.execute(getDb());

  await getDb()
    .updateTable('index')
    .set('configured', 1)
    .where('id', '=', id)
    .execute();
}

export async function updateIndexConfig<Path extends KeyPaths<IndexConfig>> (id: number, configPath: Path, value: Extract<IndexConfig, Path>) {
  const { numUpdatedRows } = await getDb()
    .updateTable('index')
    .set('config', eb => eb.fn<string>('json_set', ['index.config', eb.val('$' + configPath), eb.fn('JSON_EXTRACT', [eb.val(JSON.stringify(value)), eb.val('$')])]))
    .set('last_modified_at', new Date())
    .where('id', '=', id)
    .where('configured', '=', 0)
    .executeTakeFirstOrThrow();
  if (Number(numUpdatedRows) === 0) {
    throw new Error('Cannot update index config');
  }
}

type KeyPaths<O> = O extends (infer Item)[]
  ? `[${number}]${KeyPaths<Item>}` | `[${number}]`
  : O extends Record<string, any> ? { [P in keyof O]: `.${P & string}${KeyPaths<O[P]>}` }[keyof O] | `.${string & keyof O}`
    : ''

type Extract<O, K extends KeyPaths<O>> =
  K extends `.${infer K0 extends keyof O & string}`
    ? O[K0]
    : K extends `.${infer K0 extends keyof O & string}.${infer Rest}`
      ? ExtractObjectKey<O, K0, `.${Rest}`>
      : K extends `.${infer K0 extends keyof O & string}[${infer Rest}`
        ? ExtractObjectKey<O, K0, `[${Rest}`>
        : K extends `[${infer K0 extends keyof O & number}]`
          ? O[K0]
          : K extends `[${infer K0 extends keyof O & number}].${infer Rest}`
            ? ExtractObjectKey<O, K0, `.${Rest}`>
            : K extends `[${infer K0 extends keyof O & number}][${infer Rest}`
              ? ExtractObjectKey<O, K0, `[${Rest}`>
              : never
  ;

type ExtractObjectKey<O, K extends keyof O, Rest> =
  Rest extends ''
    ? O[K]
    : Rest extends KeyPaths<O[K]>
      ? Extract<O[K], Rest>
      : never

