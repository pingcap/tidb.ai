import { getErrorMessage } from '@/lib/errors';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export const deleteChat = withToast(async (id: string) => {
  await fetch(`/api/v1/chats/${id}`, {
    method: 'DELETE',
  })
    .then(handleErrors);
}, {
  loading: () => 'Deleting chat',
  success: () => 'Chat successfully deleted.',
  error: (error) => `Failed to delete chat: ${getErrorMessage(error)}`,
});
