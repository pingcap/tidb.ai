import { AppIndexBaseService } from '@/core/services/base';
<<<<<<< Updated upstream
import { type Chat, type ChatMessage, createChatMessage, createChatMessageRetrieveRel, getChatByUrlKey, listChatMessages, updateChatMessage } from '@/core/v1/chat';
import { tx } from '@/core/v1/db';
=======
import { type Chat, type ChatMessage, createChatMessage, createChatMessageRetrieveRel, getChat, getChatByUrlKey, listChatMessages, updateChatMessage } from '@/core/repositories/chat';
import { tx } from '@/core/db';
>>>>>>> Stashed changes
import { AUTH_FORBIDDEN_ERROR, getErrorMessage } from '@/lib/errors';
import { notFound } from 'next/navigation';

export type ChatOptions = {
  userInput: string
  userId: string
  history: ChatMessage[]
}

export type ChatResponse = {
  status: 'retrieving' | 'generating' | 'finished'
  content: string
  sources: { title: string, uri: string }[]
  retrieveId?: number
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

    const response = trackAsyncGenerator(
      () => this.run(chat, { userInput, history, userId }),
      async results => {
        await updateChatMessage(message.id, {
          content: results.map(result => result.content).join(''),
          finished_at: new Date(),
          status: 'SUCCEED',
        });
        const retrieves = results
          .map(result => result.retrieveId)
          .filter((id: number | undefined): id is number => typeof id === 'number')
          .reduce((set, id) => set.add(id), new Set<number>());
        for (let retrieve of retrieves) {
          await createChatMessageRetrieveRel({
            chat_message_id: message.id,
            retrieve_id: retrieve,
            info: JSON.stringify({}), // TODO: what use?
          });
        }
      },
      async err => {
        await updateChatMessage(message.id, {
          finished_at: new Date(),
          error_message: getErrorMessage(err),
          status: 'FAILED',
        });
      });

    return {
      session_id: chat.url_key,
      message_ordinal: history.length + 1,
      response,
    };
  }

  protected abstract run (chat: Chat, options: ChatOptions): AsyncGenerator<ChatResponse>;

}

function trackAsyncGenerator<T> (generator: () => AsyncGenerator<T>, onFinish: (results: T[]) => Promise<void>, onFailed: (reason: unknown) => Promise<void>) {
  return async function* () {
    try {
      const results: T[] = [];
      for await (let item of generator()) {
        yield item;
        results.push(item);
      }
      await onFinish(results);
    } catch (e) {
      await onFailed(e);
      throw e;
    }
  }();
}
