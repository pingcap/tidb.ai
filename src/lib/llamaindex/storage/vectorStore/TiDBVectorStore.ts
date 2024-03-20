import {
  BaseNode,
  Metadata,
  MetadataMode,
  VectorStore,
  VectorStoreQuery,
  VectorStoreQueryResult,
  TextNode
} from "llamaindex";
import type { PoolOptions, RowDataPacket } from "mysql2/promise";
import type { Kysely, Sql } from "kysely";
import {cosineDistance, vectorToSql} from "@/lib/kysely";
import {randomUUID} from "node:crypto";

export const DEFAULT_TIDB_VECTOR_TABLE = "document_chunk";

export const DEFAULT_TIDB_VECTOR_DIMENSIONS = 1536;

interface DocumentChunk extends RowDataPacket {
  id: string;
  text: string;
  metadata: Metadata;
  embedding: number[];
  score: number;
}

/**
 * Provides support for writing and querying vector data in TiDB.
 */
export class TiDBVectorStore implements VectorStore {
  storesText: boolean = true;

  private db?: Kysely<any>;
  private poolOptions: PoolOptions = {};
  private tableName: string = DEFAULT_TIDB_VECTOR_TABLE;
  private dimensions: number = DEFAULT_TIDB_VECTOR_DIMENSIONS;

  /**
   * Constructs a new instance of the TiDBVectorStore
   *
   * @param {object} config - The configuration settings for the instance.
   * @param {string} config.tableName - The name of the table (optional). Defaults to TIDB_VECTOR_TABLE.
   * @param {number} config.dimensions - The dimensions of the embedding model.
   * @param {string} config.client -
   */
  constructor(config?: {
    poolOptions?: PoolOptions;
    tableName?: string;
    dimensions?: number;
    client?: Kysely<any>;
  }) {
    this.tableName = config?.tableName ?? DEFAULT_TIDB_VECTOR_TABLE;
    this.dimensions = config?.dimensions ?? 1536;
    this.poolOptions = config?.poolOptions ?? {};

    // If a client is provided, use it.
    if (config?.client) {
      this.db = config.client;
    }
  }

  private async getDb(): Promise<Kysely<any>> {
    if (!this.db) {
      try {
        const  { createPool } = await import('mysql2');
        const { Kysely, MysqlDialect, sql } = await import("kysely");

        // Create DB connection.
        const db = new Kysely<any>({
          dialect: new MysqlDialect({
            pool: createPool(this.poolOptions),
          }),
        });

        // Check schema, table(s), index(es).
        await this.checkSchema(db, sql);

        // Keep the connection reference.
        this.db = db;
      } catch (err: any) {
        console.error(err);
        return Promise.reject(err);
      }
    }

    return Promise.resolve(this.db);
  }

  private async checkSchema(db: Kysely<any>, sql: Sql) {
    await sql`CREATE TABLE IF NOT EXISTS ${this.tableName}(
        -- Text Node Common Fields
        id BINARY(16) NOT NULL,
        hash CHAR(32) NOT NULL,
        text TEXT NOT NULL,
        metadata JSON NOT NULL,
        embedding VECTOR<FLOAT>(${this.dimensions}) NOT NULL COMMENT 'hnsw(distance=cosine)',
        -- Document Chunk Extra Fields
        document_id BINARY(16),
        PRIMARY KEY (id)
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
      return Promise.resolve([]);
    }

    try {
      const data = embeddingResults.map((row) => ({
        id: row.id_.length ? row.id_ : randomUUID(),
        hash: row.hash,
        text: row.getContent(MetadataMode.EMBED),
        metadata: {
          ...row.metadata,
          create_date: new Date(),
        },
        embedding: vectorToSql(row.getEmbedding()),
      }));

      const db = await this.getDb();
      await db.insertInto(this.tableName).values(data).execute();
      return Promise.resolve(data.map((d) => d.id));
    } catch (err) {
      const msg = `${err}`;
      console.log(msg, err);
      return Promise.reject(err);
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
    await db.deleteFrom(this.tableName).where('id', '=', refDocId).execute();
    return Promise.resolve();
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
      return qc.selectFrom(this.tableName)
        .select((eb) => {
          return [
            'id', 'hash', 'text', 'metadata', 'embedding', 'document_id',
            cosineDistance(eb, 'embedding', query.queryEmbedding!).as('score')
          ]
        })
        .orderBy('score')
        .limit(n);
    })
      .selectFrom('cte')
      .select([ 'id', 'hash', 'text', 'metadata', 'embedding', 'document_id', 'score'])
      .where((eb) => {
        const filters = query.filters?.filters ?? []
        return eb.and(filters.map((f) => {
          return db.fn<any>('JSON_EXTRACT', ['metadata', f.key]), '=', f.value
        }));
      })
      .limit(k);
    const rows = await qb.execute() as DocumentChunk[];

    return {
      nodes: this.rowsToTextNodes(rows),
      similarities: rows.map((row) => row.score),
      ids: rows.map((row) => row.id),
    };
  }

  private rowsToTextNodes(rows: DocumentChunk[]): TextNode[] {
    return rows.map((row) => {
      return new TextNode({
        id_: row.id,
        hash: row.hash,
        text: row.text,
        metadata: row.metadata,
        embedding: row.embedding,
      });
    });
  }

}
