import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export const batchRetry = withToast(async (ids: string[], revalidate: () => void) => {
  const { updated } = await fetch('/api/v1/sources/tasks/operation/retry', {
    method: 'post',
    body: JSON.stringify({
      ids: ids.map(i => parseInt(i)),
    }),
  }).then(handleErrors)
    .then(res => res.json())
    .finally(() => {
      revalidate();
    });

  return updated;
}, {
  success: updated => `Rescheduled ${updated} tasks.`,
});
