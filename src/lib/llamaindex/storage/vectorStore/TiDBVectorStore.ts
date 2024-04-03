import type { Json } from '@/core/v1/db/schema';
import type { LlamaindexDocumentChunkNodeTable } from '@/jobs/v1/llamaindexDocumentIndexTaskProcessor';
import type { Overwrite } from '@tanstack/table-core';
import {
  BaseNode,
  Metadata,
  MetadataMode,
  VectorStore,
  VectorStoreQuery,
  VectorStoreQueryResult,
  TextNode, RetrieverQueryEngine, NodeRelationship,
} from 'llamaindex';
import type { PoolOptions } from "mysql2/promise";
import type {ExpressionBuilder, Kysely, Sql} from "kysely";
import {binToUUID, cosineDistance, uuidToBin} from "@/lib/kysely";
import {randomUUID, UUID} from "node:crypto";

interface DocumentChunkNode {
  document_id: number;
  embedding: unknown | null;
  hash: string;
  id: Buffer;
  index_id: number;
  metadata: Json;
  text: string;
}

interface DocumentNode {
  document_id: number;
  hash: string;
  id: Buffer;
  index_id: number;
  index_info: Json;
  indexed_at: Date;
  metadata: Json;
  text: string;
}

interface Relationship {
  source_node_id: Buffer;
  target_node_id: Buffer;
  type: "CHILD" | "NEXT" | "PARENT" | "PREVIOUS" | "SOURCE";
}

export const DEFAULT_TIDB_VECTOR_TABLE_NAME = `llamaindex_document_chunk_node_default`;

export const DEFAULT_TIDB_VECTOR_DIMENSIONS = 1536;

type VectorTableName = `llamaindex_document_chunk_node_${string}`;


export interface TiDBVectorDB {
  [key: VectorTableName]: DocumentChunkNode;
  llamaindex_document_node: DocumentNode;
  llamaindex_node_relationship: Relationship;
  [key: string]: any
}

export interface TiDBVectorStoreConfig {
  poolOptions?: PoolOptions;
  tableName: VectorTableName;
  dimensions: number;
  dbClient?: Kysely<TiDBVectorDB> | (() => Kysely<TiDBVectorDB>);
  dbTransaction?: <R> (db: Kysely<TiDBVectorDB>, scope: (trx: Kysely<TiDBVectorDB>) => Promise<R>) => Promise<R>;
}

/**
 * Provides support for writing and querying vector data in TiDB.
 */
export class TiDBVectorStore implements VectorStore {
  storesText: boolean = true;

  private config: TiDBVectorStoreConfig;
  private dbClient?: Kysely<TiDBVectorDB> | (() => Kysely<TiDBVectorDB>);
  private dbTransaction: <R> (db: Kysely<TiDBVectorDB>, scope: (trx: Kysely<TiDBVectorDB>) => Promise<R>) => Promise<R>;

  /**
   * Constructs a new instance of the TiDBVectorStore
   *
   * @param {object} config - The configuration settings for the instance.
   * @param {PoolOptions} config.poolOptions - The pool options for the TiDB connection.
   * @param {string} config.tableName - The name of the table (optional). Defaults to TIDB_VECTOR_TABLE.
   * @param {number} config.dimensions - The dimensions of the embedding model.
   * @param {Kysely} config.client - The Kysely client to use for the connection, if provided it will be used instead of creating a new one.
   */
  constructor(config?: TiDBVectorStoreConfig) {
    this.config = Object.assign({
      tableName: DEFAULT_TIDB_VECTOR_TABLE_NAME,
      dimensions: DEFAULT_TIDB_VECTOR_DIMENSIONS,
      poolOptions: {},
    }, config);

    if (config?.dbClient) {
      this.dbClient = config.dbClient;
    }
    if (config?.dbTransaction) {
      this.dbTransaction = config.dbTransaction;
    } else {
      this.dbTransaction = (db, scope) => db.transaction().execute(scope);
    }
  }

  private async getDb(): Promise<Kysely<TiDBVectorDB>> {
    if (!this.dbClient) {
      try {
        const  { createPool } = await import('mysql2');
        const { Kysely, MysqlDialect, sql } = await import("kysely");

        // Create DB connection.
        const db = new Kysely<TiDBVectorDB>({
          dialect: new MysqlDialect({
            pool: createPool(this.config.poolOptions!),
          }),
        });

        // Check schema, table(s), index(es).
        await this.checkSchema(db, sql);

        // Keep the connection reference.
        this.dbClient = db;
      } catch (err: any) {
        console.error(err);
        throw err;
      }
    }

    if (typeof this.dbClient === 'function') {
      return this.dbClient();
    }

    return this.dbClient;
  }

  private async checkSchema(db: Kysely<TiDBVectorDB>, sql: Sql) {
    await sql`CREATE TABLE IF NOT EXISTS ${this.config.tableName}(
        -- Text Node Common Fields
        id BINARY(16) NOT NULL,
        hash CHAR(32) NOT NULL,
        text TEXT NOT NULL,
        metadata JSON NOT NULL,
        embedding VECTOR<FLOAT>(${this.config.dimensions}) NOT NULL COMMENT 'hnsw(distance=cosine)',
        -- Extra Document Chunk Node Fields
        index_id INT NOT NULL,
        document_id INT NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY idx_ldcn_on_index_id_document_id (index_id, document_id)
    );`.execute(db);
    return db;
  }

  /**
   * Connects to the database specified in environment vars.
   * This method also checks and creates the vector extension,
   * the destination table and indexes if not found.
   * @returns A connection to the database, or the error encountered while connecting/setting up.
   */
  client() {
    return this.getDb();
  }

  /**
   * Adds vector record(s) to the table.
   * @param embeddingResults The Nodes to be inserted, optionally including metadata tuples.
   * @returns A list of zero or more id values for the created records.
   */
  async add(embeddingResults: BaseNode<Metadata>[]): Promise<string[]> {
    if (embeddingResults.length == 0) {
      console.debug("Empty list sent to TiDBVectorStore::add");
      return [];
    }

    try {
      const data = embeddingResults.map((row) =>  {
        const id = row.id_.length ? row.id_ as UUID : randomUUID();
        return {
          id,
          hash: row.hash,
          text: row.getContent(MetadataMode.EMBED),
          metadata: {
            ...row.metadata,
            create_date: new Date(),
          },
          embedding: row.getEmbedding(),
          // Extra Document Chunk Node Fields.
          index_id: row.metadata.index_id,
          document_id: row.metadata.document_id,
        };
      });

      const db = await this.getDb();
      await this.dbTransaction(db, async (txn) => {
        // TODO: Using bulk insert instead of individual inserts.
        for (let { id, ...rest } of data) {
          await txn
            .insertInto(this.config.tableName)
            .values((eb) => {
              return [
                uuidToBin(id),
                rest.hash,
                rest.text,
                rest.metadata,
                rest.embedding,
                rest.index_id,
                rest.document_id
              ]
            })
            .execute();
        }
      });
      return data.map((d) => d.id);
    } catch (err) {
      const msg = `${err}`;
      console.log(msg, err);
      throw err;
    }
  }

  /**
   * Deletes a single record from the database by id.
   * @param refDocId Unique identifier for the record to delete.
   * @param deleteKwargs Not used.
   * @returns Promise that resolves if the delete query did not throw an error.
   */
  async delete(refDocId: string, deleteKwargs?: any): Promise<void> {
    const db = await this.getDb();
    await this.dbTransaction(db, async txn => {
      await txn.deleteFrom(this.config.tableName).where('id', '=', uuidToBin(refDocId as UUID)).execute();
      await txn.deleteFrom('llamaindex_node_relationship').where(eb => eb.or([
        eb('source_node_id', '=', uuidToBin(refDocId as UUID)),
        eb('target_node_id', '=', uuidToBin(refDocId as UUID)),
      ])).execute();
    })
  }

  /**
   * Query the vector store for the closest matching data to the query embeddings
   * @param query The VectorStoreQuery to be used
   * @param options Not used.
   * @returns Zero or more Document instances with data from the vector store.
   */
  async query(
    query: VectorStoreQuery,
    options?: any,
  ): Promise<VectorStoreQueryResult> {
    // Notice: If the query contains a WHERE clause, the query will not be able to use the HNSW index.
    // Therefore, the query is split into two steps:
    // 1. Using the HNSW index in the sub query to get the Top N results
    // 2. Then using the WHERE condition in the main query to filter the results to get K results.
    const k = query.similarityTopK ?? 2;

    // In order to avoid getting fewer than K results due to filtering, N is set to 5 times K.
    const n = k * 5;

    // Query the top K similar documents / document chunks.
    const db = await this.getDb();
    const qb = db.with('cte', (qc) => {
      return qc.selectFrom(this.config.tableName)
        .select((eb) => {
          return [
            binToUUID(eb, 'id').as('id'),
            'hash', 'text', 'metadata', 'embedding', 'index_id', 'document_id',
            cosineDistance(eb, 'embedding', query.queryEmbedding!).as('score')
          ]
        })
        .orderBy('score')
        .limit(n);
    })
      .with('cte_rel', qc => qc.selectFrom('llamaindex_node_relationship')
        .innerJoin(this.config.tableName, 'llamaindex_node_relationship.target_node_id', `${this.config.tableName}.id`)
        .select(['source_node_id', 'target_node_id', 'type', `${this.config.tableName}.metadata`])
      )
      .selectFrom('cte')
      .leftJoin('cte_rel', 'cte_rel.source_node_id', 'cte.id')
      .select(eb => eb.fn('bin_to_uuid', ['id']).as('id'))
      .select(['hash', 'text', 'metadata', 'embedding', 'index_id', 'document_id', 'score'])
      .select(eb => eb.fn<Record<Relationship['type'], { nodeId: UUID, metadata: Json }>>('json_objectagg', ['cte_rel.type', eb => eb.fn('json_object', ['cte_rel.target_node_id as nodeId', 'cte_rel.metadata'])]).as('relationships'))
      .where((eb) => {
        const filters = query.filters?.filters ?? []
        return eb.and(filters.map((f) => {
          return eb(db.fn<any>('JSON_EXTRACT', ['metadata', f.key]), '=', f.value)
        }));
      })
      .limit(k);
    const rows = await qb.execute();

    return {
      nodes: this.mapDocumentChunksToTextNodes(rows),
      similarities: rows.map((row) => row.score),
      ids: rows.map((row) => row.id),
    };
  }

  private mapDocumentChunksToTextNodes(rows: Overwrite<DocumentChunkNode, { id: UUID, metadata: any, relationships: Record<Relationship['type'], { nodeId: UUID, metadata: any }> }>[]): TextNode[] {
    return rows.map((row) => {
      return new TextNode({
        id_: row.id,
        hash: row.hash,
        text: row.text,
        metadata: {
          ...row.metadata,
          // Extra Document Chunk Node Fields.
          index_id: row.index_id,
          document_id: row.document_id
        },
        embedding: row.embedding as number[],
        relationships: row.relationships,
      });
    });
  }

}
