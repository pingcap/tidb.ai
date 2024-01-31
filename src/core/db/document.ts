import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import type { Insertable, Selectable, Updateable } from 'kysely';

const accept = [
  'text/plain',
  'text/html',
  'text/markdown',
  'application/pdf',
];

export interface DocumentDb {
  listAll (): Promise<Selectable<DB['document']>[]>;

  listByCreatedAt (from: Date | null, limit: number): Promise<Selectable<DB['document']>[]>;

  listByNotIndexed (indexName: string, limit: number): Promise<Selectable<DB['document']>[]>;

  findById (id: string): Promise<Selectable<DB['document']> | undefined>;

  findBySourceUri (id: string): Promise<Selectable<DB['document']> | undefined>;

  findBySourceUris (uri: string[]): Promise<Selectable<DB['document']>[]>;

  insert (documents: Insertable<DB['document']>[]): Promise<void>;

  update (id: string, partial: Updateable<DB['document']>): Promise<void>;

  getIndexState (indexName: string): Promise<Record<string, number>>;
}

const documentDb = {
  async listAll () {
    return await db.selectFrom('document')
      .selectAll()
      .execute();
  },

  async listByCreatedAt (from, limit) {
    let builder = db.selectFrom('document')
      .selectAll()
      .orderBy('created_at asc')
      .limit(limit);
    if (from) {
      builder = builder.where('created_at', '>', eb => eb.val(from));
    }

    return await builder.execute();
  },

  async listByNotIndexed (indexName: string, limit: number): Promise<Selectable<DB['document']>[]> {
    return await db.selectFrom('document')
      .selectAll('document')
      .leftJoin('v_document_index_status', 'document.id', 'v_document_index_status.document_id')
      .where('index_state', 'in', ['staled', 'notIndexed'])
      .where(eb => eb.or([
        eb('index_name', '=', eb => eb.val(indexName)),
        eb('index_name', 'is', null),
      ]))
      .where('v_document_index_status.mime', 'in', accept)
      .limit(limit)
      .orderBy('document.last_modified_at desc')
      .execute();
  },

  async getIndexState (indexName: string) {
    const result = await db.selectFrom('v_document_index_status')
      .select([
        'index_state',
        eb => eb.fn.count('document_id').as('count'),
      ])
      .where(cb => cb.or([
        cb('index_name', '=', eb => eb.val(indexName)),
        cb('index_name', 'is', null),
      ]))
      .where('mime', 'in', accept)
      .groupBy('index_state')
      .execute();

    return result.reduce((map, item) => {
      map[item.index_state || ''] = Number(item.count);
      return map;
    }, {} as Record<string, number>);
  },

  async findById (id: string) {
    return await db.selectFrom('document')
      .selectAll()
      .where('id', '=', eb => eb.val(id))
      .executeTakeFirst();
  },
  async findBySourceUri (uri: string) {
    return await db.selectFrom('document')
      .selectAll()
      .where('source_uri', '=', eb => eb.val(uri))
      .executeTakeFirst();
  },
  async findBySourceUris (uris: string[]) {
    if (uris.length === 0) {
      return [];
    }
    return await db.selectFrom('document')
      .selectAll()
      .where('source_uri', 'in', uris)
      .execute();
  },
  async insert (documents) {
    if (documents.length === 0) {
      return;
    }
    await db.insertInto('document')
      .values(documents)
      .execute();
  },

  async update (id, partial) {
    await db.updateTable('document')
      .set({
        ...partial,
        last_modified_at: partial.last_modified_at ?? new Date(),
      })
      .where('id', '=', eb => eb.val(id))
      .execute();
  },
} satisfies DocumentDb;

export { documentDb };
