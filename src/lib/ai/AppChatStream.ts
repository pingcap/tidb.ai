import type { ChatResponse } from '@/core/services/chating';
import { AppChatStreamData, AppChatStreamState } from '@/lib/ai/AppChatStreamData';
import { getErrorMessage } from '@/lib/errors';
import { formatStreamPart, StreamingTextResponse, type StreamString, StreamTextResult, type TextStreamPart } from 'ai';
import { format } from 'date-fns';

export class AppChatStream extends ReadableStream<ChatResponse> {
  public readonly data: AppChatStreamData;

  constructor (
    public readonly sessionId: string,
    public readonly messageOrdinal: number,
    pull: (controller: ReadableStreamDefaultController<ChatResponse>, data: AppChatStreamData) => Promise<void>,
  ) {
    const data = new AppChatStreamData(messageOrdinal);
    super({
      pull: async (controller) => {
        await pull(controller, data);
      },
    });
    this.data = data;
  }

  toResponse (): Response {
    return new StreamingTextResponse(
      this.pipeThrough(createChatResponseTransform()),
      {
        headers: {
          'X-CreateRag-Session': this.sessionId,
        },
      },
      this.data);
  }

  static create (sessionId: string, messageOrdinal: number, pull: (controller: ReadableStreamDefaultController<ChatResponse>, data: AppChatStreamData) => Promise<void>) {
    return new AppChatStream(sessionId, messageOrdinal, pull);
  }
}

function createChatResponseTransform () {
  return new TransformStream<ChatResponse, StreamString>({
    transform: (chunk, controller) => {
      if (chunk.status === AppChatStreamState.ERROR) {
        controller.enqueue(formatStreamPart('error', getErrorMessage(chunk.error)));
      } else {
        controller.enqueue(formatStreamPart('text', chunk.content));
      }
    },
  })
}
