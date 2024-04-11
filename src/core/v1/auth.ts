import { getDb } from '@/core/v1/db';

export async function listAllProviders (enabled?: true) {
  return await getDb().selectFrom('authentication_provider')
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

export async function listAllEnabledProvidersWithConfig () {
  if (!process.env.DATABASE_URL) {
    return [];
  }
  return await getDb().selectFrom('authentication_provider')
    .select(['name', 'enabled', 'config'])
    .where('enabled', '=', 1)
    .execute();
}

export async function updateProvider (name: string, config: any) {
  const result = await getDb().updateTable('authentication_provider')
    .where('name', '=', eb => eb.val(name))
    .set({
      config: JSON.stringify(config),
    })
    .executeTakeFirst();

  return Number(result.numUpdatedRows) > 0;
}

export async function toggleProvider (name: string, enable: boolean) {
  const result = await getDb().updateTable('authentication_provider')
    .where('name', '=', eb => eb.val(name))
    .set({
      enabled: enable ? 1 : 0,
    })
    .executeTakeFirst();

  return Number(result.numUpdatedRows) > 0;
}

export async function removeProvider (name: string) {
  const result = await getDb().deleteFrom('authentication_provider')
    .where('name', '=', eb => eb.val(name))
    .executeTakeFirst();

  return Number(result.numDeletedRows) > 0;
}

export async function createProvider (name: string, config: any) {
  await getDb().insertInto('authentication_provider')
    .values({
      name,
      config: JSON.stringify(config),
      enabled: 0,
    })
    .onDuplicateKeyUpdate({
      config: JSON.stringify(config),
    })
    .execute();
}