import crypto from 'crypto';

export function generateSHA256Hash(data: string) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}