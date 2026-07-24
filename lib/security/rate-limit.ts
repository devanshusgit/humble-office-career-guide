import { env } from '@/lib/env';

const ipStore = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000;

  const record = ipStore.get(ip);

  if (!record || record.expiresAt < now) {
    ipStore.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= env.RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}
