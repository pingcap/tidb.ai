import { uuidToBin } from '@/lib/kysely';
import type { Kysely } from 'kysely';
import { BaseIndexStore, IndexStruct } from 'llamaindex';
import type { UUID } from 'node:crypto';

interface Index {
  id: Buffer;
  name: string;
  summary: string;
  llm: string;
  embedding: string;
  reranker: string;
  created_at: Date;
  last_modified_at: Date;
}

interface SelectedIndex extends Omit<Index, 'id'> {
  id: UUID;
}

interface TiDBIndexStoreDatabaseShape {
  index: Index;
}

export class TiDBIndexStore extends BaseIndexStore {
  constructor (private db: Kysely<TiDBIndexStoreDatabaseShape>) {super();}

  async getIndexStructs (): Promise<TiDBIndexStruct[]> {
    const indexes = await this.db.selectFrom('index')
      .selectAll()
      .select(eb => eb.fn('bin_to_uuid', ['id']).as('id'))
      .execute();

    return indexes.map(idx => new TiDBIndexStruct(idx));
  }

  async addIndexStruct ({ raw: { id, ...index } }: TiDBIndexStruct): Promise<void> {
    await this.db.insertInto('index')
      .values({
        id: uuidToBin(id),
        ...index,
      })
      .execute();
  }

  async deleteIndexStruct (key: UUID): Promise<void> {
    await this.db.deleteFrom('index')
      .where('id', '=', uuidToBin(key))
      .execute();
  }

  async getIndexStruct (structId?: UUID | undefined): Promise<TiDBIndexStruct | undefined> {
    if (!structId) {
      const indexes = await this.getIndexStructs();
      if (indexes.length !== 1) {
        throw new Error(`there are ${indexes.length} indexes`);
      }
      return indexes[0];
    }
    const index = await this.db.selectFrom('index')
      .selectAll()
      .select(eb => eb.fn('bin_to_uuid', ['id']).as('id'))
      .where('id', '=', uuidToBin(structId))
      .executeTakeFirst();

    return index && new TiDBIndexStruct(index);
  }
}

export class TiDBIndexStruct extends IndexStruct {
  constructor (public readonly raw: Readonly<SelectedIndex>) {
    super(raw.id);
  }

  get name () {
    return this.raw.name;
  }

  getSummary (): string {
    return this.raw.summary;
  }
}

