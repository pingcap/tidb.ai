import { type ChatMessage, ChatMessageRole } from '@/api/chats';

export function createExampleInitialChatMessage (): ChatMessage {
  return {
    id: 1,
    post_verification_result_url: null,
    chat_id: '0000',
    ordinal: 1,
    content: '',
    created_at: new Date(),
    updated_at: new Date(),
    finished_at: null,
    error: null,
    role: ChatMessageRole.assistant,
    sources: [],
    trace_url: '',
    user_id: 'example_user',
  };
}
