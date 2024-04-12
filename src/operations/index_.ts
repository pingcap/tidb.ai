import type { IndexConfig } from '@/core/v1/index_';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export const updateIndexConfigPart = withToast(<K extends keyof IndexConfig> (id: number, key: K, value: IndexConfig[K]) =>
  fetch(`/api/v1/indexes/${id}/config/${key}`, {
    method: 'put',
    body: JSON.stringify(value),
  }).then(handleErrors),
);
