import { parseJSON } from 'date-fns';
import { z } from 'zod';

export function zodJsonDate (message?: string) {
  return z.string().pipe(d);
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
