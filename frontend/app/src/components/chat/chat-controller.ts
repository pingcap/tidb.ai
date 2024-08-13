import { chat, type Chat, type ChatMessage, type PostChatParams } from '@/api/chats';
import { ChatMessageController, type OngoingState } from '@/components/chat/chat-message-controller';
import { AppChatStreamState, chatDataPartSchema, type ChatMessageAnnotation, fixChatInitialData } from '@/components/chat/chat-stream-state';
import { getErrorMessage } from '@/lib/errors';
import { type JSONValue, type StreamPart } from 'ai';
import EventEmitter from 'eventemitter3';

export interface ChatControllerEventsMap {
  'created': [Chat];
  'updated': [Chat];
  'message-loaded': [messageController: ChatMessageController];

  /**
   * Emit instantly when {@link ChatController#post} is called
   */
  'post': [params: Omit<PostChatParams, 'chat_id'>];

  /**
   * Emit when server returned chat and chat_message info
   */
  'post-initialized': [];
  'post-finished': [];
  'post-error': [error: unknown];
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

    // Initialize post states
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

      // Process stream parts and dispatch to ongoingMessageController
      for await (let part of streamParts) {
        ongoingMessageController = this._processPart(ongoingMessageController, part);
      }

      // Cleanup post states
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

  _processPart (ongoingMessageController: ChatMessageController | undefined, part: ReturnType<StreamPart<any, any, any>['parse']>) {
    switch (part.type) {
      case 'data':
        // Data part contains chat and chat_message info from server. will be sent twice (beginning and finished).
        // We will update frontend cached and computed info like message content which is computed from stream text deltas.
        ongoingMessageController = this._processDataPart(ongoingMessageController, part);
        break;
      case 'message_annotations':
        // Message annotations part containing current generating state.
        this._processMessageAnnotationPart(ongoingMessageController, part);
        break;
      case 'text':
        this._processTextPart(ongoingMessageController, part);
        break;
      case 'error':
        this._processErrorPart(ongoingMessageController, part);
        break;
      default:
        console.warn('unsupported stream part', part);
    }
    return ongoingMessageController;
  }

  private _processDataPart (ongoingMessageController: ChatMessageController | undefined, part: ReturnType<StreamPart<any, 'data', JSONValue[]>['parse']>): ChatMessageController {
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

    return ongoingMessageController;
  }

  private _processMessageAnnotationPart (ongoingMessageController: ChatMessageController | undefined, part: ReturnType<StreamPart<any, 'message_annotations', JSONValue[]>['parse']>) {
    assertNonNull(ongoingMessageController, 'Cannot handle chat stream part: no ongoingMessageController', part);
    const annotation: ChatMessageAnnotation = part.value[0] as any;
    ongoingMessageController.applyStreamAnnotation(annotation);
  }

  private _processTextPart (ongoingMessageController: ChatMessageController | undefined, part: ReturnType<StreamPart<any, 'text', string>['parse']>) {
    if (part.value) { // ignore leading empty chunks.
      assertNonNull(ongoingMessageController, 'Cannot handle chat stream part: no ongoingMessageController', part);
      ongoingMessageController.applyDelta(part.value);
    }
  }

  private _processErrorPart (ongoingMessageController: ChatMessageController | undefined, part: ReturnType<StreamPart<any, 'error', string>['parse']>) {
    assertNonNull(ongoingMessageController, 'Cannot handle chat stream part: no ongoingMessageController', part);
    ongoingMessageController.applyError(part.value);
  }

  private createMessage (message: ChatMessage, initialOngoingState?: OngoingState) {
    const controller = new ChatMessageController(message, initialOngoingState);
    this._messages.set(message.id, controller);
    this.emit('message-loaded', controller);
    return controller;
  }
}

function assertNonNull<T> (value: T, message: string, ...args: any): asserts value is NonNullable<T> {
  if (value == null) {
    console.warn(message, args);
    throw new Error('bad stream');
  }
}
