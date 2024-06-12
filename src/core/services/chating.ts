import { tx } from '@/core/db';
import { type Chat, type ChatMessage, createChatMessage, createChatMessageRetrieveRel, deleteChatMessages, getChatByUrlKey, getChatMessage, listChatMessages, updateChatMessage } from '@/core/repositories/chat';
import { AppIndexBaseService } from '@/core/services/base';
import { AppChatStream, type AppChatStreamSource, AppChatStreamState } from '@/lib/ai/AppChatStream';
import { AUTH_FORBIDDEN_ERROR, getErrorMessage } from '@/lib/errors';
import { LangfuseTraceClient } from 'langfuse';
import { notFound } from 'next/navigation';

export type ChatOptions = {
  userInput: string;
  userId: string;
  requestMessage: ChatMessage;
  respondMessage: ChatMessage;
  history: ChatMessage[];
}

// TODO: split into different type of events?
export type ChatStreamEvent = {
  status: AppChatStreamState;
  statusMessage: string;
  traceId?: string;
  traceURL?: string;
  sources: AppChatStreamSource[];
  content: string;
  retrieveId?: number;
  error?: unknown;
}

export interface ChatNonStreamingResult {
  traceId?: string;
  traceURL: string;
  content: string;
  sources: AppChatStreamSource[];
  state: AppChatStreamState;
}

export abstract class AppChatService extends AppIndexBaseService {

  chat(sessionId: string, userId: string, userInput: string, regenerating: boolean, stream: true): Promise<AppChatStream>;
  chat(sessionId: string, userId: string, userInput: string, regenerating: boolean, stream: false): Promise<ChatNonStreamingResult>
  async chat(sessionId: string, userId: string, userInput: string, regenerating: boolean, stream: true | false): Promise<AppChatStream | ChatNonStreamingResult> {
    const { chat, history } = await this.getSessionInfo(sessionId, userId);
    const { requestMessage, respondMessage } = await this.startChat(chat, history, userInput, regenerating);

    if (stream) {
      return new AppChatStream(sessionId, respondMessage.id, async controller => {
        try {
          let content = '';
          let retrieveIds = new Set<number>();
          for await (const chunk of this.run(chat, {
            userInput,
            history,
            userId,
            requestMessage,
            respondMessage
          })) {
            controller.appendText(chunk.content, chunk.status === AppChatStreamState.CREATING /* force sends an empty text chunk first, to avoid a dependency BUG */);
            controller.setChatState(chunk.status, chunk.statusMessage);
            controller.setTraceURL(chunk.traceURL);
            controller.setSources(chunk.sources);
            content += chunk.content;
            if (chunk.retrieveId) {
              retrieveIds.add(chunk.retrieveId);
            }
          }
          controller.setChatState(AppChatStreamState.FINISHED);
          await this.finishChat(respondMessage, content, retrieveIds);
        } catch (error) {
          controller.setChatState(AppChatStreamState.ERROR, getErrorMessage(error));
          await this.terminateChat(respondMessage, error);
          return Promise.reject(error);
        }
      });
    } else {
      let chatResult: ChatNonStreamingResult = {
        traceURL: '',
        content: '',
        sources: [],
        state: AppChatStreamState.CREATING,
      };
      try {
        let retrieveIds = new Set<number>();
        for await (const chunk of this.run(chat, {
          userInput,
          history,
          userId,
          requestMessage,
          respondMessage
        })) {
          chatResult.content += chunk.content;
          chatResult.sources = chunk.sources;
          if (chunk.retrieveId) {
            retrieveIds.add(chunk.retrieveId);
          }
          if (chunk.traceURL && chunk.traceURL.length > 0) {
            chatResult.traceURL = chunk.traceURL;
          }
          if (chunk.traceId && chunk.traceId.length > 0) {
            chatResult.traceId = chunk.traceId;
          }
        }
        chatResult.state = AppChatStreamState.FINISHED;
        await this.finishChat(respondMessage, chatResult.content, retrieveIds);
        return chatResult;
      } catch (error) {
        chatResult.state = AppChatStreamState.ERROR;
        await this.terminateChat(respondMessage, error);
        return Promise.reject(error);
      }
    }
  }

  async deleteHistoryFromMessage (chat: Chat, messageId: number) {
    await tx(async () => {
      const message = await getChatMessage(messageId);

      if (!message || message.chat_id !== chat.id) {
        notFound();
      }

      if (message.role !== 'assistant') {
        throw new Error('Can only regenerate assistant messages.');
      }

      await deleteChatMessages(chat.id, message.ordinal, 'REGENERATE');
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

  private async startChat (chat: Chat, history: ChatMessage[], userInput: string, regenerating: boolean): Promise<{
    requestMessage: ChatMessage,
    respondMessage: ChatMessage,
  }> {
    return await tx(async () => {
      let ordinal = history.length;
      let requestMessage = history[ordinal - 1];
      if (!regenerating) {
        requestMessage = await createChatMessage({
          role: 'user',
          chat_id: chat.id,
          content: userInput,
          created_at: new Date(),
          status: 'SUCCEED',
          ordinal: ordinal++,
          options: JSON.stringify({}),
        });
      }
      let respondMessage = await createChatMessage({
        role: 'assistant',
        chat_id: chat.id,
        content: '',
        created_at: new Date(),
        status: 'GENERATING',
        ordinal: ordinal,
        options: JSON.stringify({}),
      });
      return { requestMessage, respondMessage };
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

  protected abstract run (chat: Chat, options: ChatOptions, trace?: LangfuseTraceClient): AsyncIterable<ChatStreamEvent>;
}

