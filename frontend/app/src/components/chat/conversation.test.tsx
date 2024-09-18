import { Conversation } from '@/components/chat/conversation';
import { trigger } from '@/lib/react';
import { act, render, screen } from '@testing-library/react';

test('should disabled when input is empty', async () => {
  render(<Conversation chat={undefined} history={[]} open />);

  const textarea = await act(async () => {
    const textarea = await screen.findByPlaceholderText('Input your question here...') as HTMLTextAreaElement;

    trigger(textarea as HTMLTextAreaElement, textarea.constructor as any, '');
    return textarea;
  });
  expect(textarea.disabled).toBe(true);

  act(() => {
    trigger(textarea as HTMLTextAreaElement, textarea.constructor as any, ' ');
  });
  expect(textarea.disabled).toBe(true);

  act(() => {
    trigger(textarea as HTMLTextAreaElement, textarea.constructor as any, ' \t');
  });
  expect(textarea.disabled).toBe(true);


  act(() => {
    trigger(textarea as HTMLTextAreaElement, textarea.constructor as any, 'foo');
  });
  expect(textarea.disabled).toBe(false);
});
