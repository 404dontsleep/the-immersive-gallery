import { createHash } from 'crypto';

export function generateHash(value: Object) {
  const json = JSON.stringify(value);
  return createHash('sha256').update(json).digest('hex').slice(0, 7);
}
