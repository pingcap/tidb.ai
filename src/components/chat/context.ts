import type { useMyChat } from '@/components/chat/use-my-chat';
import type { ChatEngineOptions } from '@/core/repositories/chat_engine';
import { createContext, useContext } from 'react';

const MyChatContext = createContext<ReturnType<typeof useMyChat>>(null as any);
const ChatEngineOptions= createContext<ChatEngineOptions | null>(null);

export const useMyChatContext = () => useContext(MyChatContext);
export const MyChatProvider = MyChatContext.Provider;

export const useChatEngineOptions = () => useContext(ChatEngineOptions);
export const ChatEngineProvider = ChatEngineOptions.Provider