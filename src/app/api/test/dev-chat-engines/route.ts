import { getDb } from '@/core/db';
import { defineHandler } from '@/lib/next/handler';

export const GET = defineHandler({
  auth: 'cronjob',
}, () => {
  return getDb()
    .selectFrom('chat_engine')
    .selectAll()
    .execute();
});

export const dynamic = 'force-dynamic';
