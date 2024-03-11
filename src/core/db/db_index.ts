import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { executePage, type Page, type PageRequest } from '@/lib/database';
import { genId } from '@/lib/id';
import type { Insertable, Selectable, Updateable } from 'kysely';
import { notFound } from 'next/navigation';
import ChunkedContent = rag.ChunkedContent;
import EmbeddedContent = rag.EmbeddedContent;
import {cosineSimilarity, vectorToSql} from "@/lib/kysely";
import {DateTime} from "luxon";

export type _QueryOptions = {
  namespaceIds: number[];
}

export interface IndexDb {

  findByName (name: string): Promise<Selectable<DB['index']> | undefined>;

  update (name: string, updater: (index: Selectable<DB['index']>) => Updateable<DB['index']>): Promise<void>;

  startIndexing (index: string, documentId: string, content: ChunkedContent<any, any>): Promise<void>;

  finishIndexing (index: string, documentId: string, embeddedContent: EmbeddedContent<any, any>): Promise<void>;

  terminateIndexing (index: string, documentId: string, error: unknown): Promise<void>;

  _query (index: string, vector: Float64Array, top_k: number, options: _QueryOptions): Promise<SearchResult[]>;

  startQuery (partial: Insertable<DB['index_query']>): Promise<void>;

  finishQuery (id: string, results: Insertable<DB['index_query_result']>[]): Promise<void>;

  finishRerank (id: string, reranker: string, metadata: any, results: Insertable<DB['index_query_result']>[]): Promise<void>;

  getQuery (id: string): Promise<Selectable<DB['index_query']> | undefined>;

  getQueryResults (id: string): Promise<SearchResult[] | undefined>;

  listEmbeddings (request: PageRequest): Promise<Page<Selectable<DB['document_index_chunk']>>>;

  getDocumentIndex (name: string, documentId: string): Promise<Selectable<DB['document_index']> | undefined>;
}

type SearchResult = {
  namespace_id: number,
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

  async update (name, updater) {
    await db.transaction().execute(async db => {
      const index = await db.selectFrom('index')
        .selectAll()
        .where('name', '=', eb => eb.val(name))
        .executeTakeFirst();
      if (!index) {
        throw notFound();
      }

      const partial = updater(index);

      await db.updateTable('index')
        .set(partial)
        .where('name', '=', eb => eb.val(name))
        .execute();
    });
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

      if (content.chunks.length > 0) {
        // insert new index chunks
        await db.insertInto('document_index_chunk')
          .values(content.chunks.map((c, i) => ({
            id: genId(16),
            document_id: documentId,
            index_name: index,
            metadata: JSON.stringify(c.metadata),
            text_content: c.content,
            embedding: vectorToSql(c.vector) as never,
            staled: 0,
            ordinal: i + 1,
          })))
          .execute();
      }
    });
  },

  async terminateIndexing (index, documentId, error: any) {
    await db.updateTable('document_index')
      .set({
        created_at: new Date(),
        status: 'fail',
        trace: JSON.stringify({ name: error.name, message: error.message }),
      })
      .where('index_name', '=', eb => eb.val(index))
      .where('document_id', '=', eb => eb.val(documentId))
      .execute();
  },

  async _query (index, vector, top_k, options) {
    console.log(`Executing embedding search query with params:`, { index, top_k, options });
    let builder = db.with('most_relevant_chunks',
      (db) => db
        .selectFrom('document_index_chunk_partitioned')
        .where((eb) => {
          const conditions = [
            eb('staled', '=', 0),
            eb('index_name', '=', index),
          ];

          if (options.namespaceIds.length > 0) {
            conditions.push(eb('namespace_id', 'in', options.namespaceIds));
          }

          return eb.and(conditions);
        })
        .select([
          'namespace_id',
          'document_id',
          'chunk_id',
          (eb) => cosineSimilarity(eb, 'embedding', vector).as('score')
        ])
        .orderBy('score desc')
        .limit(top_k)
    )
      .selectFrom('most_relevant_chunks')
      .innerJoin('document_index_chunk_partitioned', (join) =>
        join.onRef('document_index_chunk_partitioned.namespace_id', '=', 'most_relevant_chunks.namespace_id')
          .onRef('document_index_chunk_partitioned.chunk_id', '=', 'most_relevant_chunks.chunk_id')
      )
      .innerJoin('document', 'document.id', 'most_relevant_chunks.document_id')
      .select([
        'most_relevant_chunks.namespace_id',
        'most_relevant_chunks.document_id',
        'most_relevant_chunks.chunk_id as document_index_chunk_id',
        'document_index_chunk_partitioned.text_content',
        'document_index_chunk_partitioned.metadata',
        'document.source_uri',
        'document.name as source_name',
        'most_relevant_chunks.score'
      ]);

    const start = DateTime.now();
    const result = await builder.execute();
    const end = DateTime.now();
    const costTime = end.diff(start, 'milliseconds').milliseconds;

    console.log(`Finished embedding search query (costTime: ${costTime} ms).`);

    return result;
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

      //// Update results after reranking.
      // await db.deleteFrom('index_query_result')
      //   .where('index_query_id', '=', eb => eb.val(id))
      //   .execute();
      //
      // await db.insertInto('index_query_result')
      //   .values(results)
      //   .execute();
    });
  },
  async finishRerank (id, reranker, metadata, results) {
    await db.transaction().execute(async db => {
      await db.updateTable('index_query')
        .set({
          reranker,
          metadata: JSON.stringify({ reranker: metadata }),
          reranked_at: new Date()
        })
        .where('id', '=', id)
        .execute();

      await db.deleteFrom('index_query_result')
        .where('index_query_id', '=', eb => eb.val(id))
        .execute();

      await db.insertInto('index_query_result')
        .values(results)
        .execute();
    })
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
      .innerJoin('document_index_chunk_partitioned', 'document_index_chunk_partitioned.chunk_id', 'index_query_result.document_index_chunk_id')
      .innerJoin('document', 'document.id', 'document_index_chunk_partitioned.document_id')
      .where('index_query_id', '=', eb => eb.val(id))
      .select([
        'document_index_chunk_partitioned.namespace_id',
        'document_index_chunk_partitioned.document_id',
        'document_index_chunk_partitioned.chunk_id as document_index_chunk_id',
        'document_index_chunk_partitioned.text_content',
        'document_index_chunk_partitioned.metadata',
        'index_query_result.score',
        'document.source_uri',
        'document.name as source_name',
      ])
      .execute();
  },

  async listEmbeddings (request) {
    const builder = db.selectFrom('document_index_chunk')
      .selectAll();

    return executePage(builder, request);
  },

  async getDocumentIndex (name: string, documentId: string) {
    return await db.selectFrom('document_index')
      .selectAll()
      .where('index_name', '=', name)
      .where('document_id', '=', documentId)
      .executeTakeFirst();
  },
};
