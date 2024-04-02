import { listRetrieves } from '@/core/v1/retrieve';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';

export const GET = defineHandler({}, async ({
  request,
}) => {
  return await listRetrieves(toPageRequest(request));
});

export const dynamic = 'force-dynamic';
