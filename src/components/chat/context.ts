import type { useMyChat } from '@/components/chat/use-my-chat';
import { createContext, useContext } from 'react';

const MyChatContext = createContext<ReturnType<typeof useMyChat>>(null as any);

export const useMyChatContext = () => useContext(MyChatContext);

export const MyChatProvider = MyChatContext.Provider;
