import type { CreateChatRequest } from '@/app/api/v1/chats/route';
import type { Chat } from '@/core/repositories/chat';
import { getErrorMessage } from '@/lib/errors';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import { z } from 'zod';

type CreateChat = z.infer<typeof CreateChatRequest>;

export const createChat = async (data: CreateChat): Promise<Chat> => {
  return await fetch(`/api/v1/chats`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleErrors).then(res => res.json());
};

export const deleteChat = withToast(async (key: string) => {
  await fetch(`/api/v1/chats/${key}`, {
    method: 'DELETE',
  })
    .then(handleErrors);
}, {
  loading: () => 'Deleting chat',
  success: () => 'Chat successfully deleted.',
  error: (error) => `Failed to delete chat: ${getErrorMessage(error)}`,
});
