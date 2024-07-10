import { z } from 'zod';

export function zodJsonDate (message?: string) {
  return z.string().pipe(z.coerce.date());
}
