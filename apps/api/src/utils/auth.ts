import crypto from 'node:crypto';
import { env } from '../config/env.config.js';

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
  role: 'customer' | 'employee' | 'admin' | 'moderator';
  iat?: number;
  exp?: number;
}

/** Hash a plaintext password with a random 16-byte salt using scrypt. */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

/** Verify a plaintext password against a stored salt:hash string. */
export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt, keyHex] = parts;
  const keyBuffer = Buffer.from(keyHex, 'hex');
  const derivedBuffer = crypto.scryptSync(password, salt, 64);
  if (keyBuffer.length !== derivedBuffer.length) return false;
  return crypto.timingSafeEqual(keyBuffer, derivedBuffer);
}

function base64UrlEncode(input: string | Buffer): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = (4 - (padded.length % 4)) % 4;
  return Buffer.from(padded + '='.repeat(padLength), 'base64').toString('utf8');
}

/** Sign an HS256 JWT token. */
export function signJwt(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + env.JWT_EXPIRES_IN_SECONDS,
  };

  const headerEncoded = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payloadEncoded = base64UrlEncode(JSON.stringify(fullPayload));
  const data = `${headerEncoded}.${payloadEncoded}`;

  const signature = crypto
    .createHmac('sha256', env.JWT_SECRET)
    .update(data)
    .digest();
  const signatureEncoded = base64UrlEncode(signature);

  return `${data}.${signatureEncoded}`;
}

/** Verify and decode an HS256 JWT token. Returns null if invalid or expired. */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
    const data = `${headerEncoded}.${payloadEncoded}`;

    const expectedSignature = base64UrlEncode(
      crypto.createHmac('sha256', env.JWT_SECRET).update(data).digest()
    );

    const sigBuf = Buffer.from(signatureEncoded);
    const expectedBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }

    const decoded = JSON.parse(base64UrlDecode(payloadEncoded)) as JwtPayload;
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
