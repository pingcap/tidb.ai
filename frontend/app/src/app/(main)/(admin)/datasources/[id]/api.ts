import { getDatasource } from '@/api/datasources';
import { isServerError } from '@/lib/request';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const cachedGetDatasource = cache(async (id: number) => {
  try {
    return await getDatasource(id);
  } catch (error) {
    if (isServerError(error, [404])) {
      notFound();
    } else {
      return Promise.reject(error);
    }
  }
});
