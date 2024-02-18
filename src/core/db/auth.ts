import { db } from '@/core/db/db';

export async function listAllProviders (enabled?: true) {
  return await db.selectFrom('authentication_providers')
    .select(['name', 'enabled'])
    .where(eb => {
      if (enabled) {
        return eb('enabled', '=', 1);
      } else {
        return eb.val(true);
      }
    })
    .execute();
}

export async function listAllEnabledProvidersWithConfig() {
  return await db.selectFrom('authentication_providers')
    .select(['name', 'enabled', 'config'])
    .where('enabled', '=', 1)
    .execute();
}

export async function updateProvider (name: string, config: any) {
  const result = await db.updateTable('authentication_providers')
    .where('name', '=', eb => eb.val(name))
    .set({
      config: JSON.stringify(config),
    })
    .executeTakeFirst();

  return Number(result.numUpdatedRows) > 0;
}

export async function toggleProvider (name: string, enable: boolean) {
  const result = await db.updateTable('authentication_providers')
    .where('name', '=', eb => eb.val(name))
    .set({
      enabled: enable ? 1 : 0,
    })
    .executeTakeFirst();

  return Number(result.numUpdatedRows) > 0;
}

export async function removeProvider (name: string) {
  const result = await db.deleteFrom('authentication_providers')
    .where('name', '=', eb => eb.val(name))
    .executeTakeFirst();

  return Number(result.numDeletedRows) > 0;
}

export async function createProvider (name: string, config: any) {
  await db.insertInto('authentication_providers')
    .values({
      name,
      config: JSON.stringify(config),
      enabled: 0,
    })
    .execute();
}