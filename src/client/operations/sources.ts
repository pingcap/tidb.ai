import { getErrorMessage } from '@/lib/errors';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export const scheduleDocumentImportTasks = withToast(
  (id: number) =>
    fetch(`/api/v1/sources/${id}/schedule`, {
      method: 'POST',
    })
      .then(handleErrors),
  {
    success: (_, id) => `Source ${id} scheduled`,
    error: (error, id) => `Failed to schedule source ${id}: ${getErrorMessage(error)}`,
  },
);

export const rescheduleDocumentImportTasks = withToast(
  (id: number, status: 'FAILED') =>
    fetch(`/api/v1/sources/${id}/retry`, {
      method: 'POST',
      body: JSON.stringify({
        status,
      }),
    })
      .then(handleErrors)
      .then(res => res.json() as Promise<{ rescheduledImportTasks: number }>),
  {
    success: (result) => `${result.rescheduledImportTasks} tasks rescheduled`,
  },
);
