import { chatOptionsSchema, createChatEngine, listChatEngine } from '@/core/v1/chat_engine';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';
import { z } from 'zod';

export const GET = defineHandler({ auth: 'admin' }, async ({ request }) => {
  return listChatEngine(toPageRequest(request));
});

export const POST = defineHandler({
  auth: 'admin',
  body: z.object({
    name: z.string(),
    engine: z.string(),
    engine_options: chatOptionsSchema,
  }),
}, async ({
  body,
}) => {
  return createChatEngine({ ...body, is_default: 0 });
});

export const dynamic = 'force-dynamic';
