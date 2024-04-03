import { type Chat, type ChatMessage, createChat, createChatMessage, createChatMessageRetrieveRel, getChat, listChatMessages, updateChatMessage } from '@/core/v1/chat';
import { tx } from '@/core/v1/db';
import { getIndex, type Index } from '@/core/v1/index_';
import { APIError, AUTH_FORBIDDEN_ERROR } from '@/lib/errors';
import { notFound } from 'next/navigation';

export type ChatOptions = {
  userInput: string
  userId: string
  history: ChatMessage[]
}

export type ChatProcessorCallbacks = {
  onStartChatMessage (message: string): Promise<number>
  onFinishChatMessage (id: number, content: string, retrievalIds: number[]): Promise<void>
  onTerminateChatMessage (id: number, reason: string): Promise<void>
}

export type ChatResponse = {
  status: 'retrieving' | 'generating' | 'finished'
  content: string
  sources: { name: string, uri: string }[]
}

export type ChatProcessor = (index: Index, chat: Chat, options: ChatOptions, callbacks: ChatProcessorCallbacks) => AsyncGenerator<ChatResponse>;

export async function chat (indexId: number, chatId: number, userId: string, userInput: string, chatProcessor: ChatProcessor) {
  const index = await getIndex(indexId);

  if (!index) {
    notFound();
  }

  const { chat, history } = await tx(async () => {
    const chat = await getChat(chatId);

    if (!chat) {
      notFound();
    }

    if (chat.created_by !== userId) {
      throw AUTH_FORBIDDEN_ERROR;
    }

    const history = await listChatMessages(chatId);
    return {
      chat, history,
    };
  });

  return { chat_id: chat.id, message_ordinal: history.length + 1, response: chatProcessor(index, chat, { userInput, history, userId }, makeChatProcessorCallbacks(chat, history)) };
}

function makeChatProcessorCallbacks (chat: Chat, history: ChatMessage[]): ChatProcessorCallbacks {
  return {
    async onStartChatMessage (content: string): Promise<number> {
      await createChatMessage({
        role: 'user',
        chat_id: chat.id,
        content,
        created_at: new Date(),
        status: 'SUCCEED',
        ordinal: history.length,
        options: JSON.stringify({}),
      });
      const message = await createChatMessage({
        role: 'assistant',
        chat_id: chat.id,
        content: '',
        created_at: new Date(),
        status: 'GENERATING',
        ordinal: history.length + 1,
        options: JSON.stringify({}),
      });
      return message.id;
    },
    async onFinishChatMessage (id: number, content: string, retrieves: number[]): Promise<void> {
      await updateChatMessage(id, {
        content,
        finished_at: new Date(),
        status: 'SUCCEED',
      });
      for (let retrieve of retrieves) {
        await createChatMessageRetrieveRel({
          chat_message_id: id,
          retrieve_id: retrieve,
          info: JSON.stringify({}), // TODO: what use?
        });
      }
    },
    async onTerminateChatMessage (id: number, reason: string): Promise<void> {
      await updateChatMessage(id, {
        finished_at: new Date(),
        error_message: reason.slice(0, 256),
        status: 'FAILED',
      });
    },
  };
}
