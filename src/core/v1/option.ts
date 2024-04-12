import { DBv1, getDb } from '@/core/v1/db';

export async function getOptionByName (name: string) {
  return await getDb().selectFrom('option')
    .selectAll()
    .where('option.option_name', '=', eb => eb.val(name))
    .executeTakeFirst();
}

export async function getOptionsByGroup (group: string) {
  return await getDb().selectFrom('option')
    .selectAll()
    .where('group_name', '=', group)
    .execute();
}

export async function updateOptionByName (name: string, value: any) {
  return await getDb().updateTable('option')
    .set({
      option_value: JSON.stringify(value),
    })
    .where('option_name', '=', name)
    .execute();
}

export async function updateOptionsByGroup (group: string, options: DBv1['option'][]) {
  return await getDb().transaction().execute(async db => {
    let updated = 0;
    for (const option of options) {
      const updateResult = await db.updateTable('option')
        .set({
          option_value: JSON.stringify(option.option_value),
        })
        .where(eb => eb.and([
          eb('option_name', '=', option.option_name),
          eb('group_name', '=', group),
        ]))
        .execute();
      updated += Number(updateResult.map(r => r.numUpdatedRows).reduce((acc, num) => {
        return acc + num;
      }));
    }
    return updated;
  });
}
