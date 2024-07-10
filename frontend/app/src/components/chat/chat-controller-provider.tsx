import type { Chat, ChatMessage, PostChatParams } from '@/api/chats';
import { ChatController, ChatMessageController, type OngoingState } from '@/components/chat/chat-controller';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { util } from 'zod';
import Omit = util.Omit;

export interface ChatsProviderValues {
  chats: Map<string, ChatController>;

  newChat (...args: ConstructorParameters<typeof ChatController>): ChatController;

  destroyChat (id: string): void;
}

export interface ChatProviderValues {
  controller: ChatController | null;

  post (postParams: Omit<PostChatParams, 'chat_id'>): Promise<void>;
}

const ChatsContext = createContext<ChatsProviderValues>({
  chats: new Map(),
  newChat (): ChatController {
    throw new Error('not in a chat context');
  },
  destroyChat () {
    throw new Error('not in a chat context');
  },
});

const ChatControllerContext = createContext<ChatController | null>(null);

export function ChatsProvider ({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState(() => new Map<string, ChatController>);

  const newChat: ChatsProviderValues['newChat'] = (...args) => {
    const controller = new ChatController(...args);
    controller.once('created', (chat) => {
      setChats(chats => new Map(chats).set(chat.id, controller));
    });

    return controller;
  };

  const destroyChat: ChatsProviderValues['destroyChat'] = (id: string) => {
    setChats(chats => {
      chats = new Map(chats);
      chats.delete(id);
      return chats;
    });
  };

  return (
    <ChatsContext.Provider value={{ chats, newChat, destroyChat }}>
      {children}
    </ChatsContext.Provider>
  );
}

export function ChatControllerProvider ({ controller, children }: { controller: ChatController | null, children: ReactNode }) {

  return (
    <ChatControllerContext.Provider value={controller}>
      {children}
    </ChatControllerContext.Provider>
  );
}

export function useChats () {
  return useContext(ChatsContext);
}

export type SubscribedChat = ReturnType<typeof useSubscribeChat>;

export function useSubscribeChat (id: string | undefined, initialChat: Chat | undefined, initialMessages: ChatMessage[] | undefined) {
  const { chats, newChat } = useChats();

  // Create essential chat controller
  const [controller, setController] = useState(() => {
    if (id) {
      let controller = chats.get(id);
      if (!controller) {
        controller = new ChatController(initialChat, initialMessages);
        chats.set(id, controller);
      }
      return controller;
    } else {
      return new ChatController(undefined, undefined, undefined);
    }
  });

  useEffect(() => {
    if (id) {
      if (!controller || controller.chat?.id !== id) {
        let controller = chats.get(id);
        if (!controller) {
          controller = newChat(initialChat, initialMessages);
        }
        setController(controller);
      }
    } else {
      if (!controller || controller.chat != null) {
        setController(new ChatController());
      }
    }
  }, [id]);

  // Bind messages
  const [chat, setChat] = useState(controller?.chat);
  const [messages, setMessages] = useState(() => controller?.orderedMessages());
  const [ongoingMessageController, setOngoingMessageController] = useState(() => controller.ongoing);
  const [pendingPost, setPendingPost] = useState<PostChatParams>();

  useEffect(() => {
    if (controller) {
      setChat(controller.chat);
      setMessages(controller.orderedMessages());
      setOngoingMessageController(ongoingMessageController);

      const handleChatCreated = (chat: Chat) => {
        setChat(chat);
      };
      const handleMessageLoaded = () => {
        setMessages(controller.orderedMessages());
      };
      const handleMessageUpdate = () => {
        setMessages(controller.orderedMessages());
      };
      const handlePost = (params: Omit<PostChatParams, 'chat_id'>) => {
        setPendingPost(params);
      };
      const handleOngoingMessageCreated = (controller: ChatMessageController) => {
        setPendingPost(undefined);
        setOngoingMessageController(controller);
      };
      const handleOngoingMessageError = (error: unknown) => {
        setPendingPost(undefined);
        setOngoingMessageController(undefined);
      };
      const handleOngoingMessageDestroy = () => {
        setOngoingMessageController(undefined);
      };

      const deps: (() => void)[] = [];

      controller
        .once('created', handleChatCreated)
        .on('updated', handleMessageLoaded)
        .on('post', handlePost)
        .on('message-loaded', handleMessageLoaded)
        .on('message-update', handleMessageUpdate)
        .on('ongoing-message-created', handleOngoingMessageCreated)
        .on('ongoing-message-error', handleOngoingMessageError)
        .on('ongoing-message-destroy', handleOngoingMessageDestroy);

      return () => {
        controller
          .off('created', handleChatCreated)
          .off('updated', handleMessageLoaded)
          .off('post', handlePost)
          .off('message-loaded', handleMessageLoaded)
          .off('message-update', handleMessageUpdate)
          .off('ongoing-message-created', handleOngoingMessageCreated)
          .off('ongoing-message-error', handleOngoingMessageError)
          .off('ongoing-message-destroy', handleOngoingMessageDestroy);
      };
    }
  }, [controller]);

  return {
    controller,
    ongoingMessageController,
    chat: chat ?? initialChat,
    messages: messages ?? initialMessages,
    pendingPost,
  };
}

function useChatMessageController (id: number) {
  const controller = useContext(ChatControllerContext);
  const [messageController, setMessageController] = useState(() => controller?.getMessageController(id));

  useEffect(() => {
    if (controller) {
      setMessageController(controller.getMessageController(id));

      const handleCreate = (controller: ChatMessageController) => {
        if (controller.message.id === id) {
          setMessageController(controller);
        }
      };
      controller.on('message-loaded', handleCreate);

      return () => {
        controller.off('message-loaded', handleCreate);
      };
    } else {
      setMessageController(undefined);
    }
  }, [controller, id]);

  return messageController;
}

// if 0, use ongoing message.
export function useChatMessage (initialMessage: ChatMessage) {
  const messageController = useChatMessageController(initialMessage.id);
  const [message, setMessage] = useState<ChatMessage & { ongoing?: OngoingState }>(() => {
    const msg = messageController?.message;
    if (msg) {
      return {
        ...msg,
        ongoing: messageController.ongoing,
      };
    }
    return initialMessage;
  });

  useEffect(() => {
    if (messageController) {
      setMessage({
        ...messageController.message,
        ongoing: messageController.ongoing,
      });

      const handleUpdate = (message: ChatMessage, ongoing?: OngoingState) => {
        setMessage({
          ...message,
          ongoing,
        });
      };
      messageController
        .on('update', handleUpdate)
        .on('stream-error', handleUpdate)
        .on('stream-update', handleUpdate)
        .on('stream-finished', handleUpdate);
      return () => {
        messageController
          .off('update', handleUpdate)
          .off('stream-error', handleUpdate)
          .off('stream-update', handleUpdate)
          .off('stream-finished', handleUpdate);
      };
    } else {
      setMessage(initialMessage);
    }
  }, [messageController, initialMessage]);

  return message;
}
