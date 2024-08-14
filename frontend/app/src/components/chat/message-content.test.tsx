import { ChatMessageRole } from '@/api/chats';

import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { MessageContent } from '@/components/chat/message-content';
import { act, render, screen } from '@testing-library/react';

test('should render incremental markdown text', async () => {
  const controller = new ChatMessageController({
    sources: [],
    content: '## Hello',
    id: 0,
    role: ChatMessageRole.assistant,
    created_at: new Date(),
    updated_at: new Date(),
    ordinal: 0,
    chat_id: '0',
    error: null,
    finished_at: null,
    trace_url: null,
    user_id: null,
  }, {
    state: AppChatStreamState.GENERATE_ANSWER,
    finished: false,
    display: '',
  });

  render(<MessageContent message={controller} />);

  expect(await screen.findByText('Hello')).not.toBeNull();

  act(() => {
    controller.applyDelta(' world!');
  });

  expect(await screen.findByText('Hello world!')).not.toBeNull();
});

test('should render static markdown text', async () => {
  const controller = new ChatMessageController({
    sources: [],
    content: '## Hello world!',
    id: 0,
    role: ChatMessageRole.assistant,
    created_at: new Date(),
    updated_at: new Date(),
    ordinal: 0,
    chat_id: '0',
    error: null,
    finished_at: null,
    trace_url: null,
    user_id: null,
  }, {
    state: AppChatStreamState.GENERATE_ANSWER,
    finished: false,
    display: '',
  });

  render(<MessageContent message={controller} />);

  expect(await screen.findByText('Hello world!')).not.toBeNull();
});
