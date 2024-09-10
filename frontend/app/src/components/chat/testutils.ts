import { type ChatMessage, ChatMessageRole } from '@/api/chats';

export function createExampleInitialChatMessage (): ChatMessage {
  return {
    id: 1,
    chat_id: '0000',
    ordinal: 1,
    content: '',
    created_at: new Date(),
    updated_at: new Date(),
    finished_at: null,
    error: null,
    role: ChatMessageRole.assistant,
    sources: [],
    graph_data: {},
    trace_url: '',
    user_id: 'example_user',
  };
}
