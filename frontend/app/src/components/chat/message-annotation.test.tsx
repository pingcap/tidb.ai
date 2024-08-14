import { ChatMessageRole } from '@/api/chats';

import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { MessageAnnotation } from '@/components/chat/message-annotation';
import { render, screen } from '@testing-library/react';

test('should display ongoing state', async () => {
  const controller = new ChatMessageController({
    sources: [],
    content: '',
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
    display: 'Foo',
  });

  render(<MessageAnnotation message={controller} />);

  expect(await screen.findByText('Foo')).not.toBeNull();
});

test('should not display finished state', async () => {
  const controller = new ChatMessageController({
    sources: [],
    content: '',
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
    state: AppChatStreamState.FINISHED,
    finished: true,
    display: 'Foo',
  });

  render(<>f<MessageAnnotation message={controller} />oo</>);

  expect(await screen.findByText('foo')).not.toBeNull();
});
