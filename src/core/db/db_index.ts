import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { genId } from '@/lib/id';
import type { Insertable, Selectable } from 'kysely';
import ChunkedContent = rag.ChunkedContent;
import EmbeddedContent = rag.EmbeddedContent;

export interface IndexDb {

  findByName (name: string): Promise<Selectable<DB['index']> | undefined>;

  startIndexing (index: string, documentId: string, content: ChunkedContent<any, any>): Promise<void>;

  finishIndexing (index: string, documentId: string, embeddedContent: EmbeddedContent<any, any>): Promise<void>;

  terminateIndexing (index: string, documentId: string, error: unknown): Promise<void>;

  _query (index: string, vector: Float64Array): Promise<SearchResult[]>;

  startQuery (partial: Insertable<DB['index_query']>): Promise<void>;

  finishQuery (id: string, results: Insertable<DB['index_query_result']>[]): Promise<void>;

  getQuery (id: string): Promise<Selectable<DB['index_query']> | undefined>;

  getQueryResults (id: string): Promise<SearchResult[] | undefined>;
}

type SearchResult = {
  document_id: string
  document_index_chunk_id: string
  text_content: string
  metadata: any
  source_uri: string
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
        text_content: content.content,
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
          text_content: content.content,
          trace: null,
          metadata: JSON.stringify(content.metadata),
        })
        .onDuplicateKeyUpdate({
          status: 'ok',
          text_content: content.content,
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
        .values(content.chunks.map(c => ({
          id: genId(16),
          document_id: documentId,
          index_name: index,
          metadata: JSON.stringify(c.metadata),
          text_content: c.content,
          embedding: JSON.stringify(Array.from(c.vector)),
          staled: 0,
        })))
        .execute();
    });
  },

  async terminateIndexing (index, documentId, error: any) {
    await db.updateTable('document_index')
      .set({
        status: 'fail',
        trace: JSON.stringify({ name: error, message: error.message }),
      })
      .where('index_name', '=', eb => eb.val(index))
      .where('document_id', '=', eb => eb.val(documentId))
      .execute();
  },

  async _query (index: string, vector: Float64Array) {
    const chunks = await db.selectFrom('document_index_chunk')
      .innerJoin('document', 'document_id', 'document.id')
      .select([
        'document_id',
        'source_uri',
        'text_content',
        'document_index_chunk.metadata',
        'document_index_chunk.id',
        eb => eb.ref('embedding').$castTo<number[]>().as('embedding'),
      ])
      .where('index_name', '=', eb => eb.val(index))
      .execute();

    type InternalResult = {
      chunk: Selectable<DB['document_index_chunk']>
      score: number
    }

    const results = chunks.map(chunk => ({
      chunk,
      score: cosineSimilarity(Float64Array.from(chunk.embedding as number[]), vector),
    }));

    return results.sort((a, b) => b.score - a.score)
      .map(res => ({
        document_index_chunk_id: res.chunk.id,
        document_id: res.chunk.document_id,
        text_content: res.chunk.text_content,
        metadata: res.chunk.metadata,
        source_uri: res.chunk.source_uri,
        score: res.score,
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
      ])
      .execute();
  },
};

function cosineSimilarity (a: rag.Vector, b: rag.Vector) {
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
