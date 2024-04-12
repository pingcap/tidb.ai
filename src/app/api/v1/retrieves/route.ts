import { listRetrieves } from '@/core/repositories/retrieve';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';

export const GET = defineHandler({}, async ({
  request,
}) => {
  return await listRetrieves(toPageRequest(request));
});

export const dynamic = 'force-dynamic';
