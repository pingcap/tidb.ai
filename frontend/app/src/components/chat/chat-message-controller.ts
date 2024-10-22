import { type ChatMessage, ChatMessageRole } from '@/api/chats';
import { AppChatStreamState, type BaseAnnotation, type ChatMessageAnnotation, type StackVMState, type StackVMStateAnnotation } from '@/components/chat/chat-stream-state';
import EventEmitter from 'eventemitter3';

export interface OngoingState<State = AppChatStreamState> {
  finished: boolean;
  state: State;
  display: string;
  message?: string;
}

export interface OngoingStateHistoryItem<State = AppChatStreamState> {
  state: OngoingState<State>;
  time: Date;
}

export interface ChatMessageControllerEventsMap<State = AppChatStreamState> {
  'update': [assistant_message: ChatMessage];
  'stream-update': [ongoing_message: ChatMessage, ongoing: OngoingState<State>, delta: string];
  'stream-history-update': [ongoing_message: ChatMessage, history: { state: OngoingState<State>, time: Date }[]];
  'stream-finished': [ongoing_message: ChatMessage];
  'stream-error': [ongoing_message: ChatMessage, ongoing: OngoingState<State>];
}

export abstract class BaseChatMessageController<
  State,
  Annotation extends BaseAnnotation<State>
> extends EventEmitter<ChatMessageControllerEventsMap<State>> {
  private _message: ChatMessage;
  private _ongoing: OngoingState<State> | undefined;
  private _ongoingHistory: OngoingStateHistoryItem<State>[] | undefined;
  public readonly role: ChatMessageRole;
  public readonly id: number;

  constructor (message: ChatMessage, ongoing: OngoingState<State> | true | undefined) {
    super();
    this._message = message;
    this._ongoing = ongoing === true ? this.createInitialOngoingState() : ongoing;
    this._ongoingHistory = ongoing ? [] : undefined;
    this.role = message.role;
    this.id = message.id;

    if (this._message.finished_at == null && !ongoing) {
      this._ongoing = this.createUnknownOngoingState();
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

  applyStreamAnnotation (annotation: Annotation) {
    if (!this._ongoing || this._ongoing.finished) {
      console.warn('message already finished');
      return;
    }
    const stateChanged = annotation.state !== this._ongoing.state;

    let message = this._message;
    const ongoing: OngoingState<State> = { ...this._ongoing };

    ongoing.state = annotation.state;
    ongoing.display = annotation.display || (stateChanged ? '' : ongoing.display);
    ongoing.message = stateChanged ? undefined : ongoing.message;

    message = this.polishMessage(message, ongoing, annotation);

    const lastOngoing = this._ongoing;

    this._ongoing = ongoing;
    this._message = message;
    if (annotation.state === AppChatStreamState.FINISHED) {
      this._ongoing.finished = true;
    }
    this.emit('stream-update', this._message, this._ongoing, '');

    if (stateChanged && this._ongoingHistory != null) {
      const lastState = this._ongoingHistory[this._ongoingHistory.length - 1];
      if (lastOngoing && lastOngoing.display && lastOngoing.state !== lastState?.state.state) {
        // Insert new state
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
      console.error('Error in ChatMessageController (on finished message):', error);
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

  abstract createInitialOngoingState (): OngoingState<State>;

  abstract createUnknownOngoingState (): OngoingState<State>;

  abstract polishMessage (message: ChatMessage, ongoing: OngoingState<State>, annotation: Annotation): ChatMessage
}

export type ChatMessageController = LegacyChatMessageController | StackVMChatMessageController;
export type ChatMessageControllerAnnotationState<C extends ChatMessageController> = C extends BaseChatMessageController<infer State, any> ? State : never;

export class LegacyChatMessageController extends BaseChatMessageController<AppChatStreamState, ChatMessageAnnotation> {
  readonly version = 'Legacy';

  createInitialOngoingState (): OngoingState {
    return {
      state: AppChatStreamState.CONNECTING,
      display: 'Connecting to server...',
      finished: false,
    };
  }

  createUnknownOngoingState (): OngoingState {
    return {
      state: AppChatStreamState.UNKNOWN,
      display: 'Unknown',
      finished: false,
    };
  }

  polishMessage (message: ChatMessage, ongoing: OngoingState, annotation: ChatMessageAnnotation) {
    switch (annotation.state) {
      case AppChatStreamState.TRACE:
        message = { ...message };
        message.trace_url = annotation.context.langfuse_url;
        break;
      case AppChatStreamState.SOURCE_NODES:
        message = { ...message };
        message.sources = annotation.context;
        break;
      case AppChatStreamState.REFINE_QUESTION:
        ongoing.message = annotation.message || ongoing.message;
        break;
    }

    return message;
  }
}

export class StackVMChatMessageController extends BaseChatMessageController<StackVMState | undefined, StackVMStateAnnotation> {
  readonly version = 'StackVM';

  createInitialOngoingState (): OngoingState<StackVMState | undefined> {
    return {
      state: undefined,
      display: 'Connecting...',
      finished: false,
    };
  }

  createUnknownOngoingState (): OngoingState<StackVMState | undefined> {
    return {
      state: undefined,
      display: 'Unknown',
      finished: false,
    };
  }

  polishMessage (message: ChatMessage, ongoing: OngoingState<StackVMState | undefined>, annotation: StackVMStateAnnotation): ChatMessage {
    return message;
  }
}