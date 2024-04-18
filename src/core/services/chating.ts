import { tx } from '@/core/db';
import { type Chat, type ChatMessage, createChatMessage, createChatMessageRetrieveRel, getChatByUrlKey, listChatMessages, updateChatMessage } from '@/core/repositories/chat';
import { AppIndexBaseService } from '@/core/services/base';
import { AppChatStream, type AppChatStreamSource, AppChatStreamState } from '@/lib/ai/AppChatStream';
import { AUTH_FORBIDDEN_ERROR, getErrorMessage } from '@/lib/errors';
import { notFound } from 'next/navigation';

export type ChatOptions = {
  userInput: string
  userId: string
  history: ChatMessage[]
}

// TODO: split into different type of events?
export type ChatStreamEvent = {
  status: AppChatStreamState;
  statusMessage: string;
  sources: AppChatStreamSource[];
  content: string;
  retrieveId?: number;
  error?: unknown;
}

export abstract class AppChatService extends AppIndexBaseService {

  async chat (sessionId: string, userId: string, userInput: string) {
    const { chat, history } = await this.getSessionInfo(sessionId, userId);
    const message = await this.startChat(chat, history, userInput);

    return new AppChatStream(sessionId, async controller => {
      try {
        let content = '';
        let retrieveIds = new Set<number>();
        for await (const chunk of this.run(chat, { userInput, history, userId })) {
          controller.appendText(chunk.content, chunk.status === AppChatStreamState.CREATING /* force send an empty text chunk first, to avoid a dependency BUG */);
          controller.setChatState(chunk.status, chunk.statusMessage);
          controller.setSources(chunk.sources);
          content += chunk.content;
          if (chunk.retrieveId) {
            retrieveIds.add(chunk.retrieveId);
          }
        }
        controller.setChatState(AppChatStreamState.FINISHED);
        await this.finishChat(message, content, retrieveIds);
      } catch (error) {
        controller.setChatState(AppChatStreamState.ERROR, getErrorMessage(error));
        await this.terminateChat(message, error);
        return Promise.reject(error);
      }
    });
  }

  private async getSessionInfo (sessionId: string, userId: string) {
    return await tx(async () => {
      const chat = await getChatByUrlKey(sessionId);

      if (!chat) {
        notFound();
      }

      if (chat.created_by !== userId) {
        throw AUTH_FORBIDDEN_ERROR;
      }

      const history = await listChatMessages(chat.id);

      return { chat, history };
    });
  }

  private async startChat (chat: Chat, history: ChatMessage[], userInput: string) {
    return await tx(async () => {
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
  }

  private async finishChat (message: ChatMessage, content: string, retrieveIds: Iterable<number>) {
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
  }

  private async terminateChat (message: ChatMessage, error: unknown) {
    await updateChatMessage(message.id, {
      finished_at: new Date(),
      error_message: getErrorMessage(error),
      status: 'FAILED',
    });
  }

  protected abstract run (chat: Chat, options: ChatOptions): AsyncIterable<ChatStreamEvent>;
}

