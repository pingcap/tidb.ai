import type { MyChatMessageAnnotation } from '@/components/chat/use-grouped-conversation-messages';
import { formatStreamPart, StreamingTextResponse } from 'ai';

export const enum AppChatStreamState {
  CONNECTING = 'CONNECTING', // only client side
  CREATING = 'CREATING',
  KG_RETRIEVING = 'KG_RETRIEVING',
  SEARCHING = 'SEARCHING',
  RERANKING = 'RERANKING',
  GENERATING = 'GENERATING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export type AppChatStreamSource = { title: string, uri: string };

export class AppChatStream extends ReadableStream<Uint8Array> {

  constructor (
    public readonly sessionId: string,
    messageId: number,
    pull: (controller: AppChatStreamController) => Promise<void>,
  ) {
    super({
      type: 'bytes',
      autoAllocateChunkSize: 4096,
      pull: async (controller) => {
        try {
          await pull(new AppChatStreamController(messageId, controller));
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
          'Content-Type': 'text/event-stream; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
        },
      });
  }
}

export class AppChatStreamController {
  private state: AppChatStreamState = AppChatStreamState.CONNECTING;
  private stateMessage: string = '';
  private sources: AppChatStreamSource[] = [];
  private textEncoder = new TextEncoder();

  constructor (private messageId: number, private controller: ReadableByteStreamController | ReadableStreamDefaultController<Uint8Array>) {
  }

  appendText (text: string, force: boolean = false) {
    if (!force && !text) {
      return;
    }
    this.encodeText(text);
  }

  setChatState (state: AppChatStreamState, stateMessage = '') {
    const delta: MyChatMessageAnnotation = {
      messageId: this.messageId,
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
        ts: Date.now(),
        context: sources,
        messageId: this.messageId,
      });
    }
  }

  setTraceURL (traceURL: string | undefined) {
    if (traceURL) {
      this.encodeMessageAnnotation({
        ts: Date.now(),
        traceURL,
        messageId: this.messageId,
      });
    }
  }

  private encodeText (text: string) {
    this.controller.enqueue(this.textEncoder.encode(formatStreamPart('text', text)));
  }

  private encodeMessageAnnotation (messageAnnotation: MyChatMessageAnnotation) {
    this.controller.enqueue(this.textEncoder.encode(formatStreamPart('message_annotations', [messageAnnotation])));
  }
}

function compareSource (a: AppChatStreamSource, b: AppChatStreamSource) {
  return a.title === b.title && a.uri === b.uri;
}

function compareSources (a: AppChatStreamSource[], b: AppChatStreamSource[]) {
  return a.length === b.length && a.reduce((res, a, i) => res && compareSource(a, b[i]), true);
}
