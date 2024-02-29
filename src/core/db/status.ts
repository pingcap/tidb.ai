import { db } from '@/core/db/db';
import type {DB, Json, JsonValue} from '@/core/db/schema';
import {Selectable, sql, UpdateResult} from 'kysely';

export interface StatusDb {

  findByName(name: string): Promise<Selectable<DB['status']> | undefined>;

  updateByName(name: string, value: any): Promise<UpdateResult[]>;

  compareAndSwap<V>(name: string, newValue: V, needUpdate: (oldVal: V, newVal: V) => boolean, action: () => Promise<void>): Promise<boolean>;

}

export const statusDb: StatusDb = {

  async findByName(name: string) {
    return await db.selectFrom('status')
      .selectAll()
      .where('status_name', '=', eb => eb.val(name))
      .executeTakeFirst();
  },

  async updateByName(name: string, value: any) {
    return await db.updateTable('status')
        .set({
          status_value: JSON.stringify(value)
        })
        .where('status_name', '=', name)
        .execute();
  },

  async compareAndSwap<V>(name: string, newValue: V, needUpdate: (oldVal: V, newVal: V) => boolean, action: () => Promise<void>): Promise<boolean> {
    return await db.transaction().execute(async txn => {
      let oldStatus;
      try {
        oldStatus = await txn.selectFrom('status')
          .selectAll()
          .where('status_name', '=', name)
          .forUpdate()
          .noWait()
          .executeTakeFirstOrThrow();
      } catch (e: any) {
        // Skip if the record is locked.
        if (e?.code === 'ER_LOCK_NOWAIT') {
          return false;
        }
        throw e;
      }

      // Handle date type.
      let oldValue = oldStatus.status_value as any;
      if (oldStatus.status_type == 'date') {
        try {
          oldValue = new Date(oldStatus.status_value as string);
        } catch (e) {
          console.warn('Invalid date format in status value:', oldStatus.status_value);
          return false;
        }
      }

      // Skip if no need to update.
      if (!needUpdate(oldValue, newValue)) {
        return false;
      }

      await action();

      await txn.updateTable('status')
        .set({
          status_value: JSON.stringify(newValue)
        })
        .where('status_name', '=', name)
        .execute();
      return true;
    });
  }

};
