import { EMPTY_CHAT_MESSAGE_ANNOTATION, type MyChatMessageAnnotation } from '@/components/chat/use-grouped-conversation-messages';
import type { ChatMessage } from '@/core/repositories/chat';
import type { AppChatStreamSource } from '@/lib/ai/AppChatStream';
import { Message } from 'ai';

export function parseSource (uri?: string) {
  if (!uri) {
    return 'Unknown';
  }
  if (/^https:\/\//.test(uri)) {
    return new URL(uri).hostname;
  } else {
    return uri;
  }
}

export function getChatMessageAnnotations (message: Message | undefined) {
  return ((message?.annotations ?? []) as MyChatMessageAnnotation[])
    .reduce((annotation, next) => Object.assign(annotation, next), { ...EMPTY_CHAT_MESSAGE_ANNOTATION });
}

export function createInitialMessages (history: ChatMessage[], context: { ordinal: number, title: string, uri: string }[]): Message[] {
  const contextMap = new Map<number, AppChatStreamSource[]>;

  context.forEach(item => {
    let sources = contextMap.get(item.ordinal);
    if (!sources) {
      contextMap.set(item.ordinal, sources = []);
    }
    sources.push({ uri: item.uri, title: item.title });
  });

  return history.map((message, index) => ({
    id: String(message.id),
    role: message.role as any,
    content: message.content,
    annotations: message.role === 'assistant' ? [
      { context: contextMap.get(message.ordinal) ?? [], messageId: message.id, ts: -1 } satisfies MyChatMessageAnnotation,
    ] : undefined,
  }));
}
