import { type ChatMessage, ChatMessageRole } from '@/api/chats';
import { AppChatStreamState, type ChatMessageAnnotation } from '@/components/chat/chat-stream-state';
import EventEmitter from 'eventemitter3';

export interface OngoingState {
  finished: boolean;
  state: AppChatStreamState;
  display: string;
}

export interface OngoingStateHistoryItem {
  state: OngoingState;
  time: Date;
}

export interface ChatMessageControllerEventsMap {
  'update': [assistant_message: ChatMessage];
  'stream-update': [ongoing_message: ChatMessage, ongoing: OngoingState, delta: string];
  'stream-history-update': [ongoing_message: ChatMessage, history: { state: OngoingState, time: Date }[]];
  'stream-finished': [ongoing_message: ChatMessage];
  'stream-error': [ongoing_message: ChatMessage, ongoing: OngoingState];
}

export class ChatMessageController extends EventEmitter<ChatMessageControllerEventsMap> {
  private _message: ChatMessage;
  private _ongoing: OngoingState | undefined;
  private _ongoingHistory: OngoingStateHistoryItem[] | undefined;
  public readonly role: ChatMessageRole;
  public readonly id: number;

  constructor (message: ChatMessage, ongoing: OngoingState | undefined) {
    super();
    this._message = message;
    this._ongoing = ongoing;
    this._ongoingHistory = ongoing ? [] : undefined;
    this.role = message.role;
    this.id = message.id;

    if (this._message.finished_at == null && !ongoing) {
      this._ongoing = {
        state: AppChatStreamState.UNKNOWN,
        display: 'Unknown',
        finished: false,
      };
    }
  }

  // dynamic, usage in react component needs subscription.
  get content () {
    return this.message?.content ?? '';
  }

  update (message: ChatMessage) {
    this._message = { ...this._message, ...message };
    this.emit('update', this._message);
  }

  applyStreamAnnotation (annotation: ChatMessageAnnotation) {
    if (!this._ongoing || this._ongoing.finished) {
      console.warn('message already finished');
      return;
    }
    let message = this._message;
    const ongoing: OngoingState = { ...this._ongoing };

    ongoing.state = annotation.state;
    ongoing.display = annotation.display;
    switch (annotation.state) {
      case AppChatStreamState.TRACE:
        message = { ...message };
        message.trace_url = annotation.context.langfuse_url;
        break;
      case AppChatStreamState.SOURCE_NODES:
        message = { ...message };
        message.sources = annotation.context;
        break;
    }

    const lastOngoing = this._ongoing;

    this._ongoing = ongoing;
    this._message = message;
    if (annotation.state === AppChatStreamState.FINISHED) {
      this._ongoing.finished = true;
    }
    this.emit('stream-update', this._message, this._ongoing, '');

    const lastState = this._ongoingHistory ? this._ongoingHistory[this._ongoingHistory.length - 1] : undefined;

    if (this._ongoingHistory != null && lastOngoing.state !== lastState?.state.state && lastOngoing) {
      this._ongoingHistory = [
        ...this._ongoingHistory,
        {
          state: lastOngoing,
          time: new Date(),
        },
      ];
      this.emit('stream-history-update', this._message, this._ongoingHistory);
    }
  }

  applyDelta (delta: string) {
    if (!this._ongoing || this._ongoing.finished) {
      console.warn('message already finished');
      return;
    }
    this._message = {
      ...this._message,
      content: this._message.content + delta,
    };
    this.emit('stream-update', this._message, this._ongoing, delta);
  }

  applyError (error: string) {
    if (!this._ongoing || this._ongoing.finished) {
      console.warn('message already finished');
      return;
    }
    this._ongoing = {
      ...this._ongoing,
      finished: true,
    };
    this._message = {
      ...this._message,
      error,
    };
    this.emit('stream-error', this._message, this._ongoing);
  }

  finish () {
    this._ongoing = undefined;
    this.emit('stream-finished', this._message);
    return this._message;
  }

  get message (): ChatMessage {
    return this._message;
  }

  get ongoing () {
    return this._ongoing;
  }

  get ongoingHistory () {
    return this._ongoingHistory;
  }
}