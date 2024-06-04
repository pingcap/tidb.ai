import {type Chat, createChat, getChatByUrlKey, listChats} from '@/core/repositories/chat';
import {getChatEngineByIdOrName} from '@/core/repositories/chat_engine';
import {getIndexByNameOrThrow} from '@/core/repositories/index_';
import {LlamaindexChatService} from '@/core/services/llamaindex/chating';
import {toPageRequest} from '@/lib/database';
import {CHAT_CAN_NOT_ASSIGN_SESSION_ID_ERROR} from '@/lib/errors';
import {defineHandler} from '@/lib/next/handler';
import {baseRegistry} from '@/rag-spec/base';
import {getFlow} from '@/rag-spec/createFlow';
import {Langfuse} from "langfuse";
import {notFound} from 'next/navigation';
import {NextResponse} from 'next/server';
import {z} from 'zod';

const ChatRequest = z.object({
  messages: z.object({
    content: z.string().min(1),
    role: z.string(),
  }).array(),
  sessionId: z.string().optional(),
  // TODO: using `title` instead of.
  name: z.string().optional(),
  index: z.string().optional(),
  // TODO: remove it
  // @Deprecated
  engine: z.number().optional(),
  chat_engine: z.string().optional(),
  regenerate: z.boolean().optional(),
  messageId: z.coerce.number().int().optional(),
  stream: z.boolean().default(true),
});

const DEFAULT_CHAT_TITLE = 'Untitled';

export const POST = defineHandler({
  body: ChatRequest,
  auth: ['anonymous', 'app'],
}, async ({
  body,
  auth,
}) => {
  const userId = auth?.user?.id!;
  let {
    index: indexName = 'default',
    messages,
  } = body;

  const engine = await getChatEngineByIdOrName(body.chat_engine ?? body.engine)

  // TODO: need refactor, it is too complex now
  // For chat page, create a chat and return the session ID (url_key) first.
  const creatingChat = messages.length === 0;
  if (creatingChat) {
    if (body.sessionId) {
      return CHAT_CAN_NOT_ASSIGN_SESSION_ID_ERROR;
    }

    // TODO: using AI generated title.
    let title = body.name ?? DEFAULT_CHAT_TITLE;
    if (title.length > 255) {
      title = title.substring(0, 255);
    }

    return await createChat({
      engine: engine.engine,
      engine_id: engine.id,
      engine_name: engine.name,
      engine_options: JSON.stringify(engine.engine_options),
      created_at: new Date(),
      created_by: userId,
      title: title,
    });
  }

  // For Ask Widget.
  let chat: Chat | undefined;
  let sessionId = body.sessionId;
  if (!sessionId) {
    chat = await createChat({
      engine: engine.engine,
      engine_id: engine.id,
      engine_name: engine.name,
      engine_options: JSON.stringify(engine.engine_options),
      created_at: new Date(),
      created_by: userId,
      title: body.name ?? body.messages.findLast(message => message.role === 'user')?.content ?? DEFAULT_CHAT_TITLE,
    });
    sessionId = chat.url_key;
  } else {
    chat = await getChatByUrlKey(sessionId);
    if (!chat) {
      notFound();
    }
  }

  const index = await getIndexByNameOrThrow(indexName);
  const flow = await getFlow(baseRegistry);
  const langfuse = new Langfuse();
  const chatService = new LlamaindexChatService({ flow, index, langfuse });

  if (body.regenerate) {
    if (!body.messageId) {
      throw new Error('Regenerate requires messageId');
    }

    await chatService.deleteHistoryFromMessage(chat, body.messageId);
  }

  const lastUserMessage = messages.findLast(m => m.role === 'user')?.content ?? '';
  const chatResult = await chatService.chat(sessionId, userId, lastUserMessage, body.regenerate ?? false, body.stream as any);

  if (body.stream) {
    return chatResult.toResponse();
  } else {
    return chatResult;
  }
});

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

export const maxDuration = 150;
