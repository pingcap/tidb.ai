import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { toFloat64Array } from '@/lib/buffer';
import { executePage, type Page, type PageRequest } from '@/lib/database';
import { genId } from '@/lib/id';
import type { Insertable, Selectable } from 'kysely';
import ChunkedContent = rag.ChunkedContent;
import EmbeddedContent = rag.EmbeddedContent;

export interface IndexDb {

  findByName (name: string): Promise<Selectable<DB['index']> | undefined>;

  startIndexing (index: string, documentId: string, content: ChunkedContent<any, any>): Promise<void>;

  finishIndexing (index: string, documentId: string, embeddedContent: EmbeddedContent<any, any>): Promise<void>;

  terminateIndexing (index: string, documentId: string, error: unknown): Promise<void>;

  _query (index: string, vector: Float64Array, top_k: number): Promise<SearchResult[]>;

  startQuery (partial: Insertable<DB['index_query']>): Promise<void>;

  finishQuery (id: string, results: Insertable<DB['index_query_result']>[]): Promise<void>;

  getQuery (id: string): Promise<Selectable<DB['index_query']> | undefined>;

  getQueryResults (id: string): Promise<SearchResult[] | undefined>;

  listEmbeddings (request: PageRequest): Promise<Page<Selectable<DB['document_index_chunk']>>>;
}

type SearchResult = {
  document_id: string
  document_index_chunk_id: string
  text_content: string
  metadata: any
  source_uri: string
  source_name: string
  score: number
}

export const indexDb: IndexDb = {
  findByName (name: string) {
    return db.selectFrom('index')
      .selectAll()
      .where('name', '=', eb => eb.val(name))
      .executeTakeFirst();
  },

  async startIndexing (index, documentId, content) {
    // Insert a new document_index or set the original index's state to `indexing`
    await db.insertInto('document_index')
      .values({
        document_id: documentId,
        index_name: index,
        status: 'indexing',
        created_at: new Date(),
        text_content: content.content.join('\n\n\n\n'),
        trace: null,
        metadata: JSON.stringify(content.metadata),
      })
      .onDuplicateKeyUpdate({
        status: 'indexing',
      })
      .execute();
  },

  async finishIndexing (index, documentId, content) {
    const now = new Date();

    await db.transaction().execute(async db => {
      // Update index state to `ok`
      await db.insertInto('document_index')
        .values({
          document_id: documentId,
          index_name: index,
          status: 'ok',
          created_at: now,
          text_content: content.content.join('\n\n\n\n'),
          trace: null,
          metadata: JSON.stringify(content.metadata),
        })
        .onDuplicateKeyUpdate({
          status: 'ok',
          text_content: content.content.join('\n\n\n\n'),
          created_at: now,
          metadata: JSON.stringify(content.metadata),
        })
        .execute();

      // mark all old document_index_chunk staled
      await db.updateTable('document_index_chunk')
        .set({
          staled: 1,
        })
        .where('index_name', '=', eb => eb.val(index))
        .where('document_id', '=', eb => eb.val(documentId))
        .where('staled', '=', 0)
        .execute();

      // insert new index chunks
      await db.insertInto('document_index_chunk')
        .values(content.chunks.map((c, i) => ({
          id: genId(16),
          document_id: documentId,
          index_name: index,
          metadata: JSON.stringify(c.metadata),
          text_content: c.content,
          embedding: Buffer.from(c.vector.buffer),
          staled: 0,
          ordinal: i + 1,
        })))
        .execute();
    });
  },

  async terminateIndexing (index, documentId, error: any) {
    await db.updateTable('document_index')
      .set({
        status: 'fail',
        trace: JSON.stringify({ name: error.name, message: error.message }),
      })
      .where('index_name', '=', eb => eb.val(index))
      .where('document_id', '=', eb => eb.val(documentId))
      .execute();
  },

  async _query (index: string, vector: Float64Array, top_k: number) {
    const vec = Float64Array.from(vector);

    const chunks = await db.selectFrom('document_index_chunk')
      .select([
        'document_index_chunk.id',
        'embedding',
      ])
      .where('staled', '=', 0)
      .where('index_name', '=', eb => eb.val(index))
      .execute();
    if (chunks.length === 0) {
      return [];
    }

    const internalResults = chunks
      .map(chunk => ({
        id: chunk.id,
        score: cosineSimilarity(vec, toFloat64Array(chunk.embedding)),
      }))
      .sort((a, b) => b.score - a.score)
      .filter(a => isFinite(a.score))
      .slice(0, top_k);

    const results = await db.selectFrom('document_index_chunk')
      .innerJoin('document', 'document_id', 'document.id')
      .select([
        'document_index_chunk.id',
        'document_id',
        'document_index_chunk.text_content',
        'document_index_chunk.metadata',
        'source_uri',
        'document.name as source_name',
      ])
      .where('document_index_chunk.id', 'in', internalResults.map(item => item.id))
      .execute();

    return internalResults.map(res => {
      const r = results.find(item => item.id === res.id);
      if (!r) {
        return undefined;
      }
      return {
        chunk: r,
        score: res.score,
      };
    })
      .filter((x): x is NonNullable<{ chunk: typeof results[0], score: number }> => !!x)
      .map(res => ({
        document_index_chunk_id: res.chunk.id,
        document_id: res.chunk.document_id,
        text_content: res.chunk.text_content,
        metadata: res.chunk.metadata,
        source_uri: res.chunk.source_uri,
        score: res.score,
        source_name: res.chunk.source_name,
      }));
  },

  async startQuery (partial) {
    await db.insertInto('index_query')
      .values(partial)
      .execute();
  },
  async finishQuery (id, results) {
    await db.transaction().execute(async db => {
      await db.updateTable('index_query')
        .set('finished_at', new Date())
        .where('id', '=', eb => eb.val(id))
        .execute();

      await db.deleteFrom('index_query_result')
        .where('index_query_id', '=', eb => eb.val(id))
        .execute();

      await db.insertInto('index_query_result')
        .values(results)
        .execute();
    });
  },
  async getQuery (id) {
    return await db.selectFrom('index_query')
      .selectAll()
      .where('id', '=', eb => eb.val(id))
      .executeTakeFirst();
  },
  async getQueryResults (id) {
    const res = await this.getQuery(id);
    if (!res) {
      return undefined;
    }
    return await db.selectFrom('index_query_result')
      .innerJoin('document_index_chunk', 'document_index_chunk.id', 'index_query_result.document_index_chunk_id')
      .innerJoin('document', 'document.id', 'document_index_chunk.document_id')
      .where('index_query_id', '=', eb => eb.val(id))
      .select([
        'document_id',
        'document_index_chunk_id',
        'document_index_chunk.text_content',
        'document_index_chunk.metadata',
        'score',
        'source_uri',
        'document.name as source_name',
      ])
      .execute();
  },

  async listEmbeddings (request) {
    const builder = db.selectFrom('document_index_chunk')
      .selectAll();

    return executePage(builder, request);
  },
};

export function cosineSimilarity (a: rag.Vector, b: rag.Vector) {
  let p = 0;
  let qa = 0;
  let qb = 0;
  for (let i = 0; i < a.length; i++) {
    p += a[i] * b[i];
    qa += Math.pow(a[i], 2);
    qb += Math.pow(b[i], 2);
  }

  return p / (Math.sqrt(qa) * Math.sqrt(qb));
}

function cosineDistance (a: rag.Vector, b: rag.Vector) {
  return 1 - cosineSimilarity(a, b);
}
