import { listIndexes } from '@/core/v1/index_';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';

export const GET = defineHandler({
  auth: 'admin',
}, async ({ request }) => {
  return await listIndexes(toPageRequest(request));
});

export const dynamic = 'force-dynamic';
