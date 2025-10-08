import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

export function createCryptoTransformer(key: string) {
  const usedKey = crypto.scryptSync(key, 'ADASD(ASD(', 32);
  return {
    to: (value: string | null) => {
      if (!value) return value;
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv(ALGORITHM, usedKey, iv);
      const encrypted = Buffer.concat([
        cipher.update(value, 'utf8'),
        cipher.final(),
      ]);
      const tag = cipher.getAuthTag();

      return JSON.stringify({
        iv: iv.toString('hex'),
        data: encrypted.toString('hex'),
        tag: tag.toString('hex'),
      });
    },
    from: (value: string | null) => {
      if (!value) return value;
      try {
        const payload = JSON.parse(value);
        const decipher = crypto.createDecipheriv(
          ALGORITHM,
          usedKey,
          Buffer.from(payload.iv, 'hex'),
        );
        decipher.setAuthTag(Buffer.from(payload.tag, 'hex'));
        const decrypted = Buffer.concat([
          decipher.update(Buffer.from(payload.data, 'hex')),
          decipher.final(),
        ]);
        return decrypted.toString('utf8');
      } catch (e) {
        return value; // fallback if already plaintext
      }
    },
  };
}
