import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import {Selectable, UpdateResult} from 'kysely';

export interface OptionDb {

  findByName(name: string): Promise<Selectable<DB['option']> | undefined>;

  findByGroup(group: string): Promise<Selectable<DB['option']>[]>;

  updateByName(name: string, value: any): Promise<UpdateResult[]>

  updateByGroup(group: string, options: DB['option'][]): Promise<number>;

}

export const optionDb: OptionDb = {

  async findByName(name: string) {
    return await db.selectFrom('option')
      .selectAll()
      .where('option.option_name', '=', eb => eb.val(name))
      .executeTakeFirst();
  },

  async findByGroup(group: string) {
    return await db.selectFrom('option')
        .selectAll()
        .where('group_name', '=', group)
        .execute();
  },

  async updateByName(name: string, value: any) {
    return await db.updateTable('option')
        .set({
          option_value: JSON.stringify(value)
        })
        .where('option_name', '=', name)
        .execute();
  },

  async updateByGroup(group: string, options: DB['option'][]) {
    return await db.transaction().execute(async db => {
      let updated = 0;
      for (const option of options) {
        const updateResult = await db.updateTable('option')
            .set({
              option_value: JSON.stringify(option.option_value)
            })
            .where(eb => eb.and([
              eb('option_name', '=', option.option_name),
              eb('group_name', '=', group)
            ]))
            .execute();
        updated += Number(updateResult.map(r => r.numUpdatedRows).reduce((acc, num) => {
          return acc + num
        }))
      }
      return updated;
    });
  },

};
