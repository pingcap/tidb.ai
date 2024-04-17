import { tx } from '@/core/db';
import { type Chat, type ChatMessage, createChatMessage, createChatMessageRetrieveRel, getChatByUrlKey, listChatMessages, updateChatMessage } from '@/core/repositories/chat';
import { AppIndexBaseService } from '@/core/services/base';
import { AppChatStream } from '@/lib/ai/AppChatStream';
import { type AppChatStreamSource, AppChatStreamState } from '@/lib/ai/AppChatStreamData';
import { AUTH_FORBIDDEN_ERROR, getErrorMessage } from '@/lib/errors';
import { notFound } from 'next/navigation';

export type ChatOptions = {
  userInput: string
  userId: string
  history: ChatMessage[]
}

export type ChatResponse = {
  status: AppChatStreamState;
  statusMessage: string;
  sources: AppChatStreamSource[];
  content: string;
  retrieveId?: number;
  error?: unknown;
}

export abstract class AppChatService extends AppIndexBaseService {
  async chat (sessionId: string, userId: string, userInput: string) {
    const { chat, history } = await tx(async () => {
      const chat = await getChatByUrlKey(sessionId);

      if (!chat) {
        notFound();
      }

      if (chat.created_by !== userId) {
        throw AUTH_FORBIDDEN_ERROR;
      }

      const history = await listChatMessages(chat.id);
      return {
        chat, history,
      };
    });

    const message = await tx(async () => {
      await createChatMessage({
        role: 'user',
        chat_id: chat.id,
        content: userInput,
        created_at: new Date(),
        status: 'SUCCEED',
        ordinal: history.length,
        options: JSON.stringify({}),
      });
      return await createChatMessage({
        role: 'assistant',
        chat_id: chat.id,
        content: '',
        created_at: new Date(),
        status: 'GENERATING',
        ordinal: history.length + 1,
        options: JSON.stringify({}),
      });
    });

    return AppChatStream.create(sessionId, history.length + 1, async (controller, data) => {
      try {
        let content = '';
        let retrieveIds = new Set<number>();
        for await (const chunk of this.run(chat, { userInput, history, userId })) {
          data.setChatState(chunk.status, chunk.statusMessage);
          data.setSources(chunk.sources);
          controller.enqueue(chunk);
          content += chunk.content;
          if (chunk.retrieveId) {
            retrieveIds.add(chunk.retrieveId);
          }
        }
        data.setChatState(AppChatStreamState.FINISHED);

        await updateChatMessage(message.id, {
          content,
          finished_at: new Date(),
          status: 'SUCCEED',
        });
        for (let retrieve of retrieveIds) {
          await createChatMessageRetrieveRel({
            chat_message_id: message.id,
            retrieve_id: retrieve,
            info: JSON.stringify({}), // TODO: what use?
          });
        }
      } catch (error) {
        await updateChatMessage(message.id, {
          finished_at: new Date(),
          error_message: getErrorMessage(error),
          status: 'FAILED',
        });
        controller.enqueue({
          status: AppChatStreamState.ERROR,
          error,
          content: '',
          sources: [],
          statusMessage: getErrorMessage(error)
        });
        data.setChatState(AppChatStreamState.ERROR, getErrorMessage(error));
        return Promise.reject(error);
      } finally {
        await data.close();
        controller.close();
      }
    });
  }

  protected abstract run (chat: Chat, options: ChatOptions): AsyncIterable<ChatResponse>;
}

