import { getDb } from '@/core/db';

export async function getAppAccessToken (rawAccessToken: string) {
  return await getDb()
    .selectFrom('app_access_token')
    .selectAll()
    .where('token', '=', eb =>
      eb.fn('SHA2', [eb.val(rawAccessToken), eb.val(256)])
    )
    .executeTakeFirst();
}