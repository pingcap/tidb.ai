import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import { executePage, type Page, type PageRequest } from '@/lib/database';
import { uuidToBin } from '@/lib/kysely';
import { subHours } from 'date-fns';
import type { ExpressionBuilder, Insertable, Selectable, Updateable } from 'kysely';
import type { UUID } from 'node:crypto';

const accept = [
  'text/plain',
  'text/html',
  'text/markdown',
  'application/pdf',
];

export type DocumentFilters = Record<'index_state' | 'q', string[]>;

export interface DBDocument extends Omit<Selectable<DB['document']>, 'id'> {
  id: UUID;
}

export interface DBInsertableDocument extends Omit<Insertable<DB['document']>, 'id'> {
  id: UUID;
}

export interface DBUpdatableDocument extends Omit<Updateable<DB['document']>, 'id'> {
}

export interface DocumentDb {
  listAll (request: PageRequest<DocumentFilters>): Promise<Page<DBDocument & { index_state: string, metadata: any, trace: string | null }>>;

  listByCreatedAt (from: Date | null, limit: number): Promise<DBDocument[]>;

  listByNotIndexed (indexName: string, limit: number): Promise<DBDocument[]>;

  listIdsByFilter (filter: DocumentFilters): Promise<string[]>;

  findById (id: UUID): Promise<DBDocument | undefined>;

  findBySourceUri (id: string): Promise<DBDocument | undefined>;

  findBySourceUris (uri: string[]): Promise<DBDocument[]>;

  insert (documents: DBInsertableDocument[]): Promise<void>;

  update (id: UUID, partial: DBUpdatableDocument): Promise<void>;

  getIndexState (indexName: string): Promise<Record<string, number>>;

  _outdate (ids: UUID[], index: string): Promise<void>;
}

const documentDb = {
  async listAll (request: PageRequest<{ index_state?: string[], q?: string[] }>) {
    const computed_index_state = (eb: ExpressionBuilder<DB, 'document' | 'document_index' | 'index'>) => eb.case()
      .when('document_index.status', 'is', null).then('notIndexed')
      .when('document_index.status', '=', 'indexing').then('indexing')
      .when('document_index.status', '=', 'fail').then('fail')
      .when('document_index.created_at', '<', eb => eb.ref('index.last_modified_at')).then('staled')
      .else('indexed')
      .end();

    let builder = db.selectFrom('document')
      .leftJoin('document_index', 'document_id', 'document.id')
      .leftJoin('index', 'index.name', 'document_index.index_name')
      .selectAll('document')
      .select(eb => eb.fn('bin_to_uuid', ['document.id']).as('id'))
      .select(eb => eb.ref('document_index.metadata').$castTo<any>().as('metadata'))
      .select(eb => computed_index_state(eb).as('index_state'))
      .select('document_index.trace')
      .select('document_index.created_at as indexed_at')
      .where(eb => eb.or([
        eb('index_name', '=', eb => eb.val('default')),
        eb('index_name', 'is', null),
      ]))
      .orderBy('document_index.created_at desc');

    // TODO: duplicated code
    if (request.index_state?.length) {
      builder = builder.where(computed_index_state, 'in', request.index_state);
    }

    if (request.q?.length === 1) {
      const query = request.q[0];
      builder = builder.where(eb => eb.or([
        eb('source_uri', 'like', eb.val('%' + query + '%')),
        eb('document.name', 'like', eb.val('%' + query + '%')),
      ]));
    }

    return await executePage(
      builder,
      request,
    );
  },

  async listByCreatedAt (from, limit) {
    let builder = db.selectFrom('document')
      .selectAll()
      .select(eb => eb.fn('bin_to_uuid', ['document.id']).as('id'))
      .orderBy('created_at asc')
      .limit(limit);
    if (from) {
      builder = builder.where('created_at', '>', eb => eb.val(from));
    }

    return await builder.execute();
  },

  async listByNotIndexed (indexName: string, limit: number) {
    return await db.selectFrom('document')
      .selectAll('document')
      .select(eb => eb.fn('bin_to_uuid', ['document.id']).as('id'))
      .leftJoin('v_document_index_status', 'document.id', 'v_document_index_status.document_id')
      .where(eb => eb.or([
        // staled or not indexed
        eb('index_state', 'in', ['staled', 'notIndexed']),
        // failed before an hour ago
        eb.and([
          eb('index_state', '=', eb.val('fail')),
          eb('indexed_at', '<', eb.val(subHours(new Date(), 1))),
        ]),
      ]))
      .where(eb => eb.or([
        eb('index_name', '=', eb => eb.val(indexName)),
        eb('index_name', 'is', null),
      ]))
      .where('v_document_index_status.mime', 'in', accept)
      .limit(limit)
      .orderBy('document.last_modified_at desc')
      .execute();
  },

  async listIdsByFilter (filter: DocumentFilters) {
    const computed_index_state = (eb: ExpressionBuilder<DB, 'document' | 'document_index' | 'index'>) => eb.case()
      .when('document_index.status', 'is', null).then('notIndexed')
      .when('document_index.status', '=', 'indexing').then('indexing')
      .when('document_index.status', '=', 'fail').then('fail')
      .when('document_index.created_at', '<', eb => eb.ref('index.last_modified_at')).then('staled')
      .else('indexed')
      .end();

    let builder = db.selectFrom('document')
      .leftJoin('document_index', 'document_id', 'document.id')
      .leftJoin('index', 'index.name', 'document_index.index_name')
      .select(eb => eb.fn('bin_to_uuid', ['document.id']).as('id'))
      .where(eb => eb.or([
        eb('index_name', '=', eb => eb.val('default')),
        eb('index_name', 'is', null),
      ]))
      .orderBy('document_index.created_at desc');

    // TODO: duplicated code
    if (filter.index_state?.length) {
      builder = builder.where(computed_index_state, 'in', filter.index_state);
    }

    if (filter.q?.length === 1) {
      const query = filter.q[0];
      builder = builder.where(eb => eb.or([
        eb('source_uri', 'like', eb.val('%' + query + '%')),
        eb('document.name', 'like', eb.val('%' + query + '%')),
      ]));
    }

    const result = await builder.execute();
    return result.map(row => row.id);
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

  async findById (id) {
    return await db.selectFrom('document')
      .selectAll()
      .select(eb => eb.fn('bin_to_uuid', ['document.id']).as('id'))
      .where('id', '=', uuidToBin(id))
      .executeTakeFirst();
  },
  async findBySourceUri (uri: string) {
    return await db.selectFrom('document')
      .selectAll()
      .select(eb => eb.fn('bin_to_uuid', ['document.id']).as('id'))
      .where('source_uri', '=', eb => eb.val(uri))
      .executeTakeFirst();
  },
  async findBySourceUris (uris: string[]) {
    if (uris.length === 0) {
      return [];
    }
    return await db.selectFrom('document')
      .selectAll()
      .select(eb => eb.fn('bin_to_uuid', ['document.id']).as('id'))
      .where('source_uri', 'in', uris)
      .execute();
  },
  async insert (documents) {
    if (documents.length === 0) {
      return;
    }
    await db.insertInto('document')
      .values(documents.map(({ id, ...document }) => ({
        ...document,
        id: uuidToBin(id),
      })))
      .execute();
  },

  async update (id, partial) {
    await db.updateTable('document')
      .set({
        ...partial,
        last_modified_at: partial.last_modified_at ?? new Date(),
      })
      .where('id', '=', uuidToBin(id))
      .execute();
  },

  async _outdate (ids, index) {
    await db.updateTable('document_index')
      .set({
        created_at: new Date(0),
      })
      .where('document_id', 'in', ids.map(id => uuidToBin(id)))
      .where('index_name', '=', eb => eb.val(index))
      .execute();
  },
} satisfies DocumentDb;

export { documentDb };
