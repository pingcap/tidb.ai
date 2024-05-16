import {CreateChatEngineOptionsSchema} from "@/core/schema/chat_engines";
import {createChatEngine, listChatEngine} from '@/core/repositories/chat_engine';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';

export const GET = defineHandler({ auth: 'admin' }, async ({ request }) => {
  return listChatEngine(toPageRequest(request));
});

export const POST = defineHandler({
  auth: 'admin',
  body: CreateChatEngineOptionsSchema,
}, async ({
  body,
}) => {
  return createChatEngine({ ...body, is_default: 0 });
});

export const dynamic = 'force-dynamic';
