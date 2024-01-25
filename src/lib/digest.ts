import type { BinaryLike } from 'crypto';
import { createHash } from 'crypto';

export function md5 (data: BinaryLike) {
  return createHash('md5')
    .update(data)
    .digest()
    .toString('hex');
}