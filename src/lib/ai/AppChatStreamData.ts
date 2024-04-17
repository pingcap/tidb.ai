import { StreamData } from 'ai';

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

export class AppChatStreamData extends StreamData {
  private state: AppChatStreamState | undefined;
  private stateMessage: string = '';
  private sources: AppChatStreamSource[] = [];

  constructor (private messageOrdinal: number) {
    super();
  }

  setChatState (state: AppChatStreamState, stateMessage: string = '') {
    const delta: any = {
      ts: Date.now()
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
      this.append({
        [this.messageOrdinal]: delta,
      });
    }
  }

  setSources (sources: AppChatStreamSource[]) {
    if (!compareSources(sources, this.sources)) {
      this.sources = sources;
      this.append({
        [this.messageOrdinal]: {
          sources,
        },
      });
    }
  }
}

function compareSource (a: AppChatStreamSource, b: AppChatStreamSource) {
  return a.title === b.title && a.uri === b.uri;
}

function compareSources (a: AppChatStreamSource[], b: AppChatStreamSource[]) {
  return a.length === b.length && a.reduce((res, a, i) => res && compareSource(a, b[i]), true);
}
