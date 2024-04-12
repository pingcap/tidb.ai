import { createSource, listSource } from '@/core/repositories/source';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

const schema = z.object({
  url: z.string(),
});

export const GET = defineHandler({}, async ({ request }) => {
  return await listSource(toPageRequest(request));
});

export const POST = defineHandler({
  body: z.object({
    url: z.string().url(),
  }),
}, async ({ body }) => {
  const url = new URL(body.url);
  if (url.pathname === '' || url.pathname === '/') {
    return await createSource({
      url: body.url,
      type: 'robots',
      created_at: new Date(),
    });
  } else {
    return await createSource({
      url: body.url,
      type: 'file',
      created_at: new Date(),
    });
  }
});

export const dynamic = 'force-dynamic';
