import { parseJSON } from 'date-fns';
import { z } from 'zod';

export function zodJsonDate (message?: string) {
  return z.string().pipe(d);
}

export function zodJsonText () {
  return z.string()
    .refine(val => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, { message: 'Invalid JSON' })
    .transform(value => JSON.parse(value));
}

const d = z
  .custom<string>(data => {
    if (typeof data !== 'string') {
      throw new Error('Requires a date string');
    }

    const date = parseJSON(data);
    return !isNaN(date.getTime());
  }, { message: 'Invalid date' })
  .transform(out => {
    return parseJSON(out);
  });
