import { DBv1, getDb } from '@/core/v1/db';
import type { Rewrite } from '@/lib/type-utils';
import { ExpressionWrapper, ReferenceExpression, type Selectable } from 'kysely';

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

export async function updateIndexConfig<Path extends KeyPaths<IndexConfig>> (id: number, configPath: Path, value: Extract<IndexConfig, Path>) {
  if (configPath.startsWith('.embedding')) {
    throw new Error('cannot modify embedding config');
  }
  await getDb()
    .updateTable('index')
    .set('config', eb => eb.fn<string>('json_set', ['index.config', eb.val('$' + configPath), eb.val(JSON.stringify(value))]))
    .where('id', '=', id)
    .execute();
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

