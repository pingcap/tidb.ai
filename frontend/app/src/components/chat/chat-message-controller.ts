import { type ChatMessage, ChatMessageRole } from '@/api/chats';
import { AppChatStreamState, type BaseAnnotation, type ChatMessageAnnotation, type StackVMState, type StackVMStateAnnotation } from '@/components/chat/chat-stream-state';
import { StackVM } from '@/lib/stackvm';
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

  'stream-tool-call': [id: string, name: string, args: any];
  'stream-tool-result': [id: string, result: any];
}

export abstract class BaseChatMessageController<
  State,
  Annotation extends BaseAnnotation<State>
> extends EventEmitter<ChatMessageControllerEventsMap<State>> {
  protected _message: ChatMessage;
  protected _ongoing: OngoingState<State> | undefined;
  protected _ongoingHistory: OngoingStateHistoryItem<State>[] | undefined;
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

    message = this._polishMessage(message, ongoing, annotation);

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

  applyToolCall ({ toolCallId, toolName, args }: { toolCallId: string, toolName: string, args: any }) {
    this.emit('stream-tool-call', toolCallId, toolName, args);
  }

  applyToolResult ({ toolCallId, result }: { toolCallId: string, result: any }) {
    this.emit('stream-tool-result', toolCallId, result);
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

  abstract parseAnnotation (raw: unknown): Annotation;

  abstract createInitialOngoingState (): OngoingState<State>;

  abstract createUnknownOngoingState (): OngoingState<State>;

  protected abstract _polishMessage (message: ChatMessage, ongoing: OngoingState<State>, annotation: Annotation): ChatMessage
}

export type ChatMessageController = LegacyChatMessageController | StackVMChatMessageController;
export type ChatMessageControllerAnnotationState<C extends ChatMessageController> = C extends BaseChatMessageController<infer State, any> ? State : never;

export class LegacyChatMessageController extends BaseChatMessageController<AppChatStreamState, ChatMessageAnnotation> {
  readonly version = 'Legacy';

  parseAnnotation (raw: unknown): ChatMessageAnnotation {
    return raw as ChatMessageAnnotation;
  }

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

  _polishMessage (message: ChatMessage, ongoing: OngoingState, annotation: ChatMessageAnnotation) {
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

export class StackVMChatMessageController extends BaseChatMessageController<StackVMState, StackVMStateAnnotation> {
  readonly version = 'StackVM';

  applyToolCall (payload: { toolCallId: string; toolName: string; args: any }) {
    super.applyToolCall(payload);
    if (this._ongoing) {
      this._ongoing = {
        ...this._ongoing,
        state: {
          task_id: this._ongoing.state.task_id,
          state: this._ongoing.state.state,
          toolCalls: [...this._ongoing.state.toolCalls, payload],
        },
      };
      this.emit('stream-update', this._message, this._ongoing, '');
    }
  }

  applyToolResult (payload: { toolCallId: string; result: any }) {
    super.applyToolResult(payload);
    if (this._ongoing) {
      const idx = this._ongoing.state.toolCalls.findIndex(toolCall => toolCall.toolCallId === payload.toolCallId);
      if (idx >= 0) {
        this._ongoing.state.toolCalls[idx] = {
          ...this._ongoing.state.toolCalls[idx],
          result: payload.result,
        };
        this._ongoing.state = { ...this._ongoing.state };
        this._ongoing = { ...this._ongoing };
        this.emit('stream-update', this._message, this._ongoing, '');
      }
    }
  }

  parseAnnotation (raw: unknown): StackVMStateAnnotation {
    const { state: rawState, plan_id } = raw as { state: StackVM.State, plan_id: string };
    const state = StackVM.model.parseState(rawState);

    return {
      state: { task_id: plan_id, state, toolCalls: [] },
      display: '[deprecated]',
    };
  }

  createInitialOngoingState (): OngoingState<StackVMState> {
    return {
      state: {
        task_id: '',
        state: {
          variables_refs: {},
          variables: {},
          errors: [],
          current_plan: [],
          program_counter: -1,
          goal_completed: false,
          goal: '',
          msgs: [],
          plan: {
            steps: [],
            vars: [],
          },
        },
        toolCalls: [],
      },
      display: 'Thinking...',
      finished: false,
    };
  }

  createUnknownOngoingState (): OngoingState<StackVMState> {
    return {
      state: {
        task_id: '',
        state: {
          variables_refs: {},
          variables: {},
          errors: ['Unknown state'],
          current_plan: [],
          program_counter: -1,
          goal_completed: false,
          goal: '',
          msgs: [],
          plan: {
            steps: [],
            vars: [],
          },
        },
        toolCalls: [],
      },
      display: 'Unknown',
      finished: false,
    };
  }

  _polishMessage (message: ChatMessage, ongoing: OngoingState<StackVMState>, annotation: StackVMStateAnnotation): ChatMessage {
    // FIX Initial state
    // First step reasoning finished with PC = 1, we need to insert a PC = 0 state first.
    if (annotation.state.state.program_counter === 1) {
      if (!this._ongoingHistory?.find(item => item.state.state.state.program_counter === 0)) {
        const lastState = {
          state: {
            state: {
              ...ongoing.state,
              state: { ...ongoing.state.state, program_counter: 0, variables: {}, variables_refs: {} },
            },
            finished: false,
            display: '[deprecated]',
          },
          time: new Date(),
        };
        this._ongoing = lastState.state;
        this._ongoingHistory = [
          ...this._ongoingHistory ?? [],
          lastState,
        ];
      }
    }

    return message;
  }
}