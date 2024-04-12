import { type IsolationLevel, Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import type { DB } from './schema';

export const kysely = new Kysely<DB>({
  dialect: new MysqlDialect({
    pool: createPool({
      uri: process.env.DATABASE_URL!,
      ssl: process.env.DATABASE_URL?.includes('tidbcloud.com') ? {
        minVersion: 'TLSv1.2',
      } : undefined,
    }),
  }),
});

const currentTx = new AsyncLocalStorage<Kysely<DB>>();

async function tx<T> (level: IsolationLevel, runner: () => Promise<T>): Promise<T>
async function tx<T> (runner: () => Promise<T>): Promise<T>
async function tx<T> (first: IsolationLevel | (() => Promise<T>), runner?: () => Promise<T>): Promise<T> {
  let builder = kysely.transaction();
  if (typeof first === 'function') {
    runner = first;
  } else {
    builder.setIsolationLevel(first);
  }

  // Join current transaction
  const current = currentTx.getStore();
  if (current) {
    return runner!();
  }

  return kysely.transaction().execute(async trx => {
    return currentTx.run(trx, runner!);
  });
}

function getDb<D extends Partial<DB> = DB> (): Kysely<D> {
  const tx = currentTx.getStore();
  if (tx) {
    return tx as never;
  }
  return kysely as never;
}

export { getDb, tx };

export type { DB as DBv1 } from './schema';
