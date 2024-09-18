import { Conversation } from '@/components/chat/conversation';
import { trigger } from '@/lib/react';
import { act, render, screen } from '@testing-library/react';

test('should disabled when input is empty', async () => {
  render(<Conversation chat={undefined} history={[]} open />);

  const { button, textarea } = await act(async () => {
    const textarea = await screen.findByPlaceholderText('Input your question here...') as HTMLTextAreaElement;
    const button = await screen.findByRole('button') as HTMLButtonElement;

    return { button, textarea };
  });
  act(() => {
    trigger(textarea as HTMLTextAreaElement, textarea.constructor as any, '');
  });
  expect(button.disabled).toBe(true);

  act(() => {
    trigger(textarea as HTMLTextAreaElement, textarea.constructor as any, ' ');
  });
  expect(button.disabled).toBe(true);

  act(() => {
    trigger(textarea as HTMLTextAreaElement, textarea.constructor as any, ' \t');
  });
  expect(button.disabled).toBe(true);

  act(() => {
    trigger(textarea as HTMLTextAreaElement, textarea.constructor as any, 'foo');
  });
  expect(button.disabled).toBe(false);
});
