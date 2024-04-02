import { type Chat, type ChatMessage, createChat, createChatMessage, getChat, listChatMessages, updateChatMessage } from '@/core/v1/chat';
import { tx } from '@/core/v1/db';
import { getIndex, type Index } from '@/core/v1/index_';
import { notFound } from 'next/navigation';
import { Response } from 'llamaindex'

export type ChatOptions = {
  userInput: string
  userId: string
  history: ChatMessage[]
}

export type ChatProcessorCallbacks = {
  onStartChatMessage (role: string): Promise<number>
  onFinishChatMessage (id: number, content: string): Promise<void>
  onTerminateChatMessage (id: number, reason: string): Promise<void>
}

export type ChatProcessor = (index: Index, chat: Chat, options: ChatOptions, callbacks: ChatProcessorCallbacks) => Promise<AsyncIterable<Response>>;

export async function chat (indexId: number, chatId: number | undefined, userId: string, userInput: string, chatProcessor: ChatProcessor) {
  const index = await getIndex(indexId);

  if (!index) {
    notFound();
  }

  if (typeof chatId === 'number') {
    const { chat, history } = await tx(async () => {
      const chat = await getChat(chatId);

      if (!chat) {
        notFound();
      }

      const history = await listChatMessages(chatId);
      return {
        chat, history,
      };
    });

    return await chatProcessor(index, chat, { userInput, history, userId }, makeChatProcessorCallbacks(chat));
  } else {
    const chat = await createChat({
      engine: 'condense-question',
      engine_options: JSON.stringify({}),
      title: userInput.slice(0, 256),
      created_at: new Date(),
      created_by: userId,
    });

    return await chatProcessor(index, chat, { userInput, userId, history: [] }, makeChatProcessorCallbacks(chat));
  }
}

function makeChatProcessorCallbacks (chat: Chat): ChatProcessorCallbacks {
  return {
    async onStartChatMessage (role: string): Promise<number> {
      const message = await createChatMessage({
        role,
        chat_id: chat.id,
        content: '',
        created_at: new Date(),
        status: 'GENERATING',
        ordinal: history.length + 1,
        options: JSON.stringify({}),
      });
      return message.id;
    },
    async onFinishChatMessage (id: number, content: string): Promise<void> {
      await updateChatMessage(id, {
        content,
        finished_at: new Date(),
        status: 'SUCCEED',
      });
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
