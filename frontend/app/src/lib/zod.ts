import { z } from 'zod';

export function zodJsonDate (message?: string) {
  return z.coerce.date();
}
