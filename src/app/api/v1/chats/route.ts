import { type ChatResponse } from '@/core/services/chating';
import { LlamaindexChatService } from '@/core/services/llamaindex/chating';
import { createChat, listChats } from '@/core/repositories/chat';
import {
  ChatEngineOptions,
  getChatEngine,
  getDefaultChatEngine
} from '@/core/repositories/chat_engine';
import { getIndexByNameOrThrow } from '@/core/repositories/index_';
import { toPageRequest } from '@/lib/database';
import {
  CHAT_CAN_NOT_ASSIGN_SESSION_ID_ERROR,
  CHAT_ENGINE_NOT_FOUND_ERROR,
} from "@/lib/errors";
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { experimental_StreamData, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ChatRequest = z.object({
  messages: z.object({
    content: z.string(),
    role: z.string(),
  }).array(),
  sessionId: z.string().optional(),
  name: z.string().optional(),
  namespaces: z.string().array().optional(),
  index: z.string().optional(),
  engine: z.number().int().optional(),
});

const DEFAULT_CHAT_TITLE = 'Untitled';

export const POST = defineHandler({
  body: ChatRequest,
  auth: 'anonymous',
}, async ({
  body,
  auth,
}) => {
  const userId = auth.user.id!;
  let {
    index: indexName = 'default',
    messages
  } = body;

  // TODO: need refactor, it is too complex now
  // For chat page, create a chat and return the session ID (url_key) first.
  const creatingChat = messages.length === 0;
  if (creatingChat) {
    if (body.sessionId) {
      return CHAT_CAN_NOT_ASSIGN_SESSION_ID_ERROR;
    }

    const [engine, engineOptions] = await getChatEngineConfig(body.engine);
    return await createChat({
      engine: engine,
      engine_options: JSON.stringify(engineOptions),
      created_at: new Date(),
      created_by: userId,
      title: body.name ?? DEFAULT_CHAT_TITLE,
    });
  }

  // For Ask Widget.
  let sessionId = body.sessionId;
  if (!sessionId) {
    const chat = await createChat({
      engine: 'condense-question',
      engine_options: JSON.stringify({}),
      created_at: new Date(),
      created_by: userId,
      title: body.name ?? body.messages.findLast(message => message.role === 'user')?.content ?? DEFAULT_CHAT_TITLE,
    });
    sessionId = chat.url_key;
  }

  const index = await getIndexByNameOrThrow(indexName);
  const flow = await getFlow(baseRegistry);
  const chatService = new LlamaindexChatService({ flow, index });
  const lastUserMessage = messages.findLast(m => m.role === 'user')?.content ?? '';
  const {
    session_id,
    message_ordinal,
    response
  } = await chatService.chat(sessionId, userId, lastUserMessage);

  return mapResponseToTextStream(session_id, message_ordinal, response);
});

async function getChatEngineConfig(engineConfigId?: number): Promise<[string, ChatEngineOptions]> {
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

async function mapResponseToTextStream (session_id: string, message_ordinal: number, responseStream: AsyncGenerator<ChatResponse>) {
  const data = new experimental_StreamData();

  const rs = new ReadableStream({
    pull: async (controller) => {
      try {
        let sourceConsumed = false;
        for await (const response of responseStream) {
          let sources: any = undefined;
          if (!sourceConsumed) {
            if (response.sources.length > 0) {
              sources = response.sources;
              sourceConsumed = true;
            }
          }
          controller.enqueue('0:' + JSON.stringify(response.content) + '\n');
          if (sources) {
            data.append({
              [message_ordinal]: {
                context: sources,
              },
            });
          }
        }
        await data.close();
      } catch (e) {
        controller.error(e);
      }
      controller.close();
    },
  });

  return new StreamingTextResponse(rs, {
    headers: {
      'X-CreateRag-Session': session_id,
    },
  }, data);
}

export const maxDuration = 60;