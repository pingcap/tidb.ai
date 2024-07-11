import { chat, type Chat, type ChatMessage, ChatMessageRole, type PostChatParams } from '@/api/chats';
import { AppChatStreamState, chatDataPartSchema, type ChatMessageAnnotation, fixChatInitialData } from '@/components/chat/chat-stream-state';
import { getErrorMessage } from '@/lib/errors';
import EventEmitter from 'eventemitter3';

export interface OngoingState {
  finished: boolean;
  state: AppChatStreamState;
  display: string;
}

export interface ChatControllerEventsMap {
  'created': [Chat];
  'updated': [Chat];
  'message-loaded': [messageController: ChatMessageController];
  'post': [params: Omit<PostChatParams, 'chat_id'>];
  'post-initialized': [];
  'post-finished': [];
  'post-error': [error: unknown];
}

export interface ChatMessageControllerEventsMap {
  'update': [assistant_message: ChatMessage];
  'stream-update': [ongoing_message: ChatMessage, ongoing: OngoingState];
  'stream-finished': [ongoing_message: ChatMessage];
  'stream-error': [ongoing_message: ChatMessage, ongoing: OngoingState];
}

export class ChatController extends EventEmitter<ChatControllerEventsMap> {
  public chat: Chat | undefined;

  private _messages: Map<number, ChatMessageController> = new Map();

  private _postParams: Omit<PostChatParams, 'chat_id'> | undefined = undefined;
  private _postError: unknown = undefined;
  private _postInitialized: boolean = false;

  get postState () {
    return {
      params: this._postParams,
      error: this._postError,
      initialized: this._postInitialized,
    };
  }

  constructor (chat: Chat | undefined = undefined, messages: ChatMessage[] | undefined = [], initialPost: Omit<PostChatParams, 'chat_id'> | undefined = undefined) {
    super();
    if (chat) {
      this.chat = chat;
    }
    for (const message of messages) {
      this.upsertMessage(message);
    }
    if (initialPost) {
      this.post(initialPost);
    }
  }

  get messages (): ChatMessageController[] {
    return Array.from(this._messages.values()).sort((a, b) => a.message.ordinal - b.message.ordinal);
  }

  async post (params: Omit<PostChatParams, 'chat_id'>) {
    if (this._postParams) {
      throw new Error('previous not finished.');
    }
    this._postParams = params;
    this._postError = undefined;
    this._postInitialized = false;
    this.emit('post', params);

    let ongoingMessageController: ChatMessageController | undefined = undefined;

    try {
      const streamParts = chat({
        chat_id: this.chat?.id,
        ...params,
      });

      for await (let part of streamParts) {
        switch (part.type) {
          case 'data': {
            const { chat, user_message, assistant_message } = chatDataPartSchema.parse(fixChatInitialData(part.value[0]));
            this.updateChat(chat);
            this.upsertMessage(user_message);
            if (!ongoingMessageController) {
              ongoingMessageController = this.createMessage(assistant_message, {
                state: AppChatStreamState.CONNECTING,
                display: 'Connecting to server...',
                finished: false,
              });
              this._postInitialized = true;
              this.emit('post-initialized');
            } else {
              ongoingMessageController.update(assistant_message);
            }
            break;
          }
          case 'message_annotations': {
            if (!ongoingMessageController) {
              console.error('Cannot handle chat stream part: no ongoingMessageController', part);
              return Promise.reject(new Error('bad stream'));
            }
            const annotation: ChatMessageAnnotation = part.value[0] as any;
            ongoingMessageController.applyStreamAnnotation(annotation);
            break;
          }
          case 'text':
            if (part.value) { // ignore leading empty chunks.
              if (!ongoingMessageController) {
                console.error('Cannot handle chat stream part: no ongoingMessageController', part);
                return Promise.reject(new Error('bad stream'));
              }
              ongoingMessageController.applyDelta(part.value);
            }
            break;
          case 'error':
            if (!ongoingMessageController) {
              return Promise.reject(new Error(part.value));
            } else {
              ongoingMessageController.applyError(part.value);
            }
            break;
          default:
            console.warn('unsupported stream part', part);
        }
      }

      if (ongoingMessageController) {
        this.upsertMessage(ongoingMessageController.finish());
      } else {
        console.warn('Empty ongoing message');
      }

      this._postParams = undefined;
      this._postInitialized = false;
      this.emit('post-finished');
    } catch (error) {
      ongoingMessageController?.applyError(getErrorMessage(error));
      this._postError = error;
      this.emit('post-error', error);
    }
  }

  // TODO: wait server implementation
  async regenerate (messageId: number) {
    throw new Error('not supported.');
  }

  updateChat (chat: Chat): void {
    const newCreated = !this.chat;
    this.chat = { ...this.chat, ...chat };
    this.emit(newCreated ? 'created' : 'updated', this.chat);
  }

  upsertMessage (message: ChatMessage): void {
    let controller = this._messages.get(message.id);

    if (controller) {
      controller.update(message);
    } else {
      this.createMessage(message);
    }
  }

  private createMessage (message: ChatMessage, initialOngoingState?: OngoingState) {
    const controller = new ChatMessageController(message, initialOngoingState);
    this._messages.set(message.id, controller);
    this.emit('message-loaded', controller);
    return controller;
  }
}

export class ChatMessageController extends EventEmitter<ChatMessageControllerEventsMap> {
  private _message!: ChatMessage;
  private _ongoing: OngoingState | undefined;
  public readonly role: ChatMessageRole;
  public readonly id: number;

  constructor (message: ChatMessage, ongoing: OngoingState | undefined) {
    super();
    this._message = message;
    this._ongoing = ongoing;
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

    this._ongoing = ongoing;
    this._message = message;
    if (annotation.state === AppChatStreamState.FINISHED) {
      this._ongoing.finished = true;
    }
    this.emit('stream-update', this._message, this._ongoing);
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
    this.emit('stream-update', this._message, this._ongoing);
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
    if (!this._message) {
      throw new Error('message info not provided');
    }

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
}
