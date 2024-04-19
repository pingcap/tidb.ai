import { createChat, listChats } from '@/core/repositories/chat';
import { ChatEngineOptions, getChatEngine, getDefaultChatEngine } from '@/core/repositories/chat_engine';
import { toPageRequest } from '@/lib/database';
import { CHAT_ENGINE_NOT_FOUND_ERROR } from '@/lib/errors';
import { defineHandler } from '@/lib/next/handler';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const CreateChatRequest = z.object({
  name: z.string(),
  namespaces: z.string().array().optional(),
  engine: z.number().int().optional(),
});

const DEFAULT_CHAT_TITLE = 'Untitled';

export const GET = defineHandler({
  auth: 'anonymous',
  searchParams: z.object({
    userId: z.string().optional(),
  }),
}, async ({ auth, request, searchParams }) => {
  let userId: string | undefined;
  if (auth.user.role === 'admin') {
    userId = searchParams.userId ?? auth.user.id;
  } else {
    userId = auth.user.id;
  }

  const { page, pageSize } = toPageRequest(request);

  return NextResponse.json(await listChats({ page, pageSize, userId }));
});

export const POST = defineHandler({
  body: CreateChatRequest,
  auth: 'anonymous',
}, async ({
  body,
  auth,
}) => {
  const userId = auth.user.id!;
  const [engine, engineOptions] = await getChatEngineConfig(body.engine);

  return await createChat({
    engine,
    engine_options: JSON.stringify(engineOptions),
    created_at: new Date(),
    created_by: userId,
    title: body.name ?? DEFAULT_CHAT_TITLE,
  });
});

async function getChatEngineConfig (engineConfigId?: number): Promise<[string, ChatEngineOptions]> {
  if (engineConfigId) {
    const chatEngine = await getChatEngine(engineConfigId);
    if (!chatEngine) {
      throw CHAT_ENGINE_NOT_FOUND_ERROR.format(engineConfigId);
    }
    return [chatEngine.engine, chatEngine.engine_options];
  } else {
    const config = await getDefaultChatEngine();
    return [config.engine, config.engine_options];
  }
}

export const maxDuration = 60;
export type { CreateChatRequest };
