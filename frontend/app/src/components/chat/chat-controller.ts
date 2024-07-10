import { chat, type Chat, type ChatMessage, type PostChatParams } from '@/api/chats';
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
  'message-update': [messageController: ChatMessageController];
  'post': [params: Omit<PostChatParams, 'chat_id'>];
  'ongoing-message-created': [messageController: ChatMessageController];
  // not protocol error
  'ongoing-message-error': [error: unknown];
  'ongoing-message-destroy': [];
}

export interface ChatMessageControllerEventsMap {
  'created': [assistant_message: ChatMessage];
  'update': [assistant_message: ChatMessage];
  'stream-update': [ongoing_message: ChatMessage, ongoing: OngoingState];
  'stream-finished': [ongoing_message: ChatMessage, ongoing: OngoingState];
  'stream-error': [ongoing_message: ChatMessage, ongoing: OngoingState];
}

export class ChatController extends EventEmitter<ChatControllerEventsMap> {
  public chat: Chat | undefined;

  private _messages: Map<number, ChatMessageController> = new Map();
  private _ongoing: ChatMessageController | undefined = undefined;

  constructor (chat: Chat | undefined = undefined, messages: ChatMessage[] | undefined = [], initialPost: Omit<PostChatParams, 'chat_id'> | undefined = undefined) {
    super();
    if (chat) {
      this.chat = chat;
    }
    for (const message of messages) {
      this.updateMessage(message);
    }
    if (initialPost) {
      this.post(initialPost);
    }
  }

  orderedMessages (): (ChatMessage & { ongoing?: OngoingState })[] {
    return Array.from(this._messages.values())
      .map(message => ({
        ...message.message,
        ongoing: message.ongoing,
      }))
      .sort((a, b) => a.ordinal - b.ordinal);
  }

  get ongoing (): ChatMessageController | undefined {
    return this._ongoing;
  }

  getMessageController (id: number): ChatMessageController | undefined {
    return this._messages.get(id);
  }

  async post (params: Omit<PostChatParams, 'chat_id'>) {
    if (this._ongoing) {
      // TODO: What if error?
      throw new Error('previous not finished.');
    }
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
            this.updateMessage(user_message);
            if (!ongoingMessageController) {
              ongoingMessageController = this.createMessage(assistant_message, {
                state: AppChatStreamState.CONNECTING,
                display: 'Connecting to server...',
                finished: false,
              });
              this.emit('ongoing-message-created', ongoingMessageController);
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

      this.emit('ongoing-message-destroy');
      if (ongoingMessageController) {
        this.updateMessage(ongoingMessageController.finish());
      } else {
        console.warn('Empty ongoing message');
      }

      this._ongoing = undefined;
    } catch (error) {
      ongoingMessageController?.applyError(getErrorMessage(error));
      this.emit('ongoing-message-error', error);
    }
  }

  async regenerate (messageId: number) {
    throw new Error('not supported.');
  }

  private updateChat (chat: Chat): void {
    const newCreated = !this.chat;
    this.chat = { ...this.chat, ...chat };
    this.emit(newCreated ? 'created' : 'updated', this.chat);
  }

  private updateMessage (message: ChatMessage): void {
    let controller = this._messages.get(message.id);

    if (controller) {
      controller.update(message);
    } else {
      this.createMessage(message);
    }
  }

  private createMessage (message: ChatMessage, initialOngoingState?: OngoingState) {
    const controller = new ChatMessageController(message, initialOngoingState);
    controller.on('update', () => this.emit('message-update', controller));
    this._messages.set(message.id, controller);
    this.emit('message-loaded', controller);
    return controller;
  }
}

export class ChatMessageController extends EventEmitter<ChatMessageControllerEventsMap> {
  private _message!: ChatMessage;
  private _ongoing: OngoingState | undefined;

  constructor (message: ChatMessage, ongoing: OngoingState | undefined) {
    super();
    this._message = message;
    this._ongoing = ongoing;

    if (this._message.finished_at == null && !ongoing) {
      this._ongoing = {
        state: AppChatStreamState.UNKNOWN,
        display: 'Unknown',
        finished: false,
      };
    }
  }

  update (message: ChatMessage) {
    const newCreated = !this._message;
    this._message = { ...this._message, ...message };
    this.emit(newCreated ? 'created' : 'update', this._message);
  }

  applyStreamAnnotation (annotation: ChatMessageAnnotation) {
    if (!this._ongoing || this._ongoing.finished) {
      console.warn('message already finished');
      return;
    }
    const message = { ...this._message };
    const ongoing: OngoingState = { ...this._ongoing };

    ongoing.state = annotation.state;
    ongoing.display = annotation.display;
    switch (annotation.state) {
      case AppChatStreamState.TRACE:
        message.trace_url = annotation.context.langfuse_url;
        break;
      case AppChatStreamState.SOURCE_NODES:
        message.sources = annotation.context;
        break;
    }

    this._message = message;
    if (annotation.state === AppChatStreamState.FINISHED) {
      this._ongoing = { ...ongoing, finished: true };
      this.emit('stream-finished', this._message, this._ongoing);
    } else {
      this._ongoing = ongoing;
      this.emit('stream-update', this._message, this._ongoing);
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
    return this._message;
  }

  get message (): ChatMessage {
    return this._message;
  }

  get ongoing () {
    return this._ongoing;
  }
}
