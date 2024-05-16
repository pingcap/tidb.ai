import {CreateChatEngineOptionsSchema} from "@/core/schema/chat_engines";
import {
  deleteChatEngine,
  getChatEngine,
  updateChatEngine
} from '@/core/repositories/chat_engine';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const SpecifiedChatEngineParamsSchema = z.object({
  id: z.coerce.number().int(),
});

export const GET = defineHandler({
  auth: 'admin',
  params: SpecifiedChatEngineParamsSchema,
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
  params: SpecifiedChatEngineParamsSchema,
  body: CreateChatEngineOptionsSchema,
}, async ({
  params,
  body,
}) => {
  return updateChatEngine(params.id, { ...body });
});

export const DELETE = defineHandler({
  auth: 'admin',
  params: SpecifiedChatEngineParamsSchema,
}, async ({ params }) => {
  await deleteChatEngine(params.id);
});

export const dynamic = 'force-dynamic';
