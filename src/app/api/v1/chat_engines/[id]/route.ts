import { chatOptionsSchema, deleteChatEngine, getChatEngine, updateChatEngine } from '@/core/v1/chat_engine';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import { z } from 'zod';

export const paramsSchema = z.object({
  id: z.coerce.number().int(),
});

export const GET = defineHandler({
  auth: 'admin',
  params: paramsSchema,
}, async ({
  params,
}) => {
  const engine = await getChatEngine(params.id);
  if (!engine) {
    notFound();
  }

  return engine;
});

export const PUT = defineHandler({
  auth: 'admin',
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: z.object({
    name: z.string(),
    engine: z.string(),
    engine_options: chatOptionsSchema,
  }),
}, async ({
  params,
  body,
}) => {
  return updateChatEngine(params.id, { ...body });
});

export const DELETE = defineHandler({
  auth: 'admin',
  params: z.object({
    id: z.coerce.number().int(),
  }),
}, async ({ params }) => {
  await deleteChatEngine(params.id);
});

export const dynamic = 'force-dynamic';
