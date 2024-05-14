import type {IndexConfig} from "@/core/config/indexes";
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export interface CreateIndexFormValues {
  name: string;
  duplicate_from?: number;
}

export const createIndex = withToast(
  async (data: CreateIndexFormValues) => {
    await fetch('/api/v1/indexes', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {},
    }).then(handleErrors);
  },
);

export const updateIndexConfigPart = withToast(<K extends keyof IndexConfig> (name: string, key: K, value: IndexConfig[K]) =>
  fetch(`/api/v1/indexes/${name}/config/${key}`, {
    method: 'put',
    body: JSON.stringify(value),
  }).then(handleErrors),
);
