import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export const batchRetry = withToast(async (ids: string[], revalidate: () => void) => {
  const { created, failed } = await fetch('/api/v2/tasks/document_import/retry', {
    method: 'post',
    body: JSON.stringify({
      ids: ids.map(i => parseInt(i)),
    }),
  }).then(handleErrors)
    .then(res => res.json())
    .finally(() => {
      revalidate();
    });

  return { created, failed };
}, {
  success: result => `${result.created} tasks rescheduled.${result.failed ? ` ${result.failed} failed, see server logs for more information.` : ''}`,
});
