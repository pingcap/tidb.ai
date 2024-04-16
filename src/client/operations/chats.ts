import { getErrorMessage } from '@/lib/errors';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

// TODO: using unique string ID instead of number ID
export const deleteChat = withToast(async (id: number) => {
  await fetch(`/api/v1/chats/${id}`, {
    method: 'DELETE',
  })
    .then(handleErrors);
}, {
  loading: () => 'Deleting chat',
  success: () => 'Chat successfully deleted.',
  error: (error) => `Failed to delete chat: ${getErrorMessage(error)}`,
});
