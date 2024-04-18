import type { MyChatMessageAnnotation } from '@/components/chat/use-grouped-conversation-messages';
import type { ChatStreamEvent } from '@/core/services/chating';
import { getErrorMessage } from '@/lib/errors';
import { formatStreamPart, StreamingTextResponse, type StreamString } from 'ai';

export const enum AppChatStreamState {
  CONNECTING = 'CONNECTING', // only client side
  CREATING = 'CREATING',
  SEARCHING = 'SEARCHING',
  RERANKING = 'RERANKING',
  GENERATING = 'GENERATING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export type AppChatStreamSource = { title: string, uri: string };

export class AppChatStream extends ReadableStream<StreamString> {

  constructor (
    public readonly sessionId: string,
    pull: (controller: AppChatStreamController) => Promise<void>,
  ) {
    super({
      pull: async (controller) => {
        try {
          await pull(new AppChatStreamController(controller));
        } catch (e) {
          controller.error(e);
          return Promise.reject(e);
        } finally {
          controller.close();
        }
      },
    });
  }

  toResponse (): Response {
    return new StreamingTextResponse(
      this,
      {
        headers: {
          'X-CreateRag-Session': this.sessionId,
        },
      });
  }
}

export class AppChatStreamController {
  private state: AppChatStreamState = AppChatStreamState.CONNECTING;
  private stateMessage: string = '';
  private sources: AppChatStreamSource[] = [];

  constructor (private controller: ReadableStreamDefaultController<StreamString>) {
  }

  appendText (text: string, force: boolean = false) {
    if (!force && !text) {
      return;
    }
    this.encodeText(text);
  }

  setChatState (state: AppChatStreamState, stateMessage = '') {
    const delta: any = {
      ts: Date.now(),
    };
    let changed = false;
    if (state !== this.state) {
      this.state = state;
      delta.state = state;
      changed = true;
    }
    if (stateMessage !== this.stateMessage) {
      this.stateMessage = stateMessage;
      delta.stateMessage = stateMessage;
      changed = true;
    }
    if (changed) {
      this.encodeMessageAnnotation(delta);
    }
  }

  setSources (sources: AppChatStreamSource[]) {
    if (!compareSources(sources, this.sources)) {
      this.sources = sources;
      this.encodeMessageAnnotation({
        context: sources,
      });
    }
  }

  private encodeText (text: string) {
    this.controller.enqueue(formatStreamPart('text', text));
  }

  private encodeMessageAnnotation (messageAnnotation: MyChatMessageAnnotation) {
    this.controller.enqueue(formatStreamPart('message_annotations', [messageAnnotation]));
  }
}

function createChatResponseTransform () {
  return new TransformStream<ChatStreamEvent, StreamString>({
    transform: (chunk, controller) => {
      if (chunk.status === AppChatStreamState.ERROR) {
        controller.enqueue(formatStreamPart('error', getErrorMessage(chunk.error)));
      } else {
        controller.enqueue(formatStreamPart('text', chunk.content));
      }
    },
  });
}

function compareSource (a: AppChatStreamSource, b: AppChatStreamSource) {
  return a.title === b.title && a.uri === b.uri;
}

function compareSources (a: AppChatStreamSource[], b: AppChatStreamSource[]) {
  return a.length === b.length && a.reduce((res, a, i) => res && compareSource(a, b[i]), true);
}
