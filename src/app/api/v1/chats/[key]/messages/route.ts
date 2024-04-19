import { getChatByUrlKey } from '@/core/repositories/chat';
import { getIndexByOptionalId } from '@/core/repositories/index_';
import { LlamaindexChatService } from '@/core/services/llamaindex/chating';
import { AUTH_FORBIDDEN_ERROR } from '@/lib/errors';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const ChatRequest = z.object({
  regenerate: z.literal(false).optional(),
  messages: z.object({
    content: z.string(),
    role: z.string(),
  }).array(),
});

const RegenerateRequest = z.discriminatedUnion('regenerate', [
  z.object({
    regenerate: z.literal(true),
    messageId: z.number().int(),
    messages: z.object({
      content: z.string(),
      role: z.string(),
    }).array(),
  }),
]);

export const POST = defineHandler({
  body: z.union([ChatRequest, RegenerateRequest]),
  params: z.object({
    key: z.string(),
  }),
  auth: 'anonymous',
}, async ({ body, params, auth }) => {
  const userId = auth.user.id!;
  const chat = await getChatByUrlKey(params.key);
  if (!chat) {
    notFound();
  }

  // Only chat owner can post messages.
  if (chat.created_by !== auth.user.id) {
    throw AUTH_FORBIDDEN_ERROR;
  }

  const index = await getIndexByOptionalId(chat.engine_options.index_id);
  if (!index) {
    throw new Error('Required index not found');
  }

  const messages = body.messages;
  const flow = await getFlow(baseRegistry);
  const chatService = new LlamaindexChatService({ flow, index });

  if (body.regenerate) {
    if (!body.messageId) {
      throw new Error('Regenerate requires messageId');
    }

    await chatService.deleteHistoryFromMessage(chat, body.messageId);
  }

  const lastUserMessage = messages.findLast(m => m.role === 'user')?.content ?? '';
  const chatStream = await chatService.chat(params.key, userId, lastUserMessage, body.regenerate ?? false);

  return chatStream.toResponse();
});

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
