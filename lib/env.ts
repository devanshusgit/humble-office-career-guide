import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SITE_NAME: z.string().default('Humble Office'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  APP_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  GEMINI_API_KEY: z.string().min(1, 'Gemini API Key is required'),
  GEMINI_MODEL: z.string().default('gemini-3.6-flash'),

  SUPABASE_URL: z.string().url('Supabase URL is required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase Service Role Key is required'),
  SUPABASE_STORAGE_BUCKET: z.string().default('career-guide-photos'),

  SMTP_HOST: z.string().min(1, 'SMTP Host is required'),
  SMTP_PORT: z.string().regex(/^\d+$/).transform(Number),
  SMTP_SECURE: z.string().transform((val) => val === 'true'),
  SMTP_USER: z.string().min(1, 'SMTP User is required'),
  SMTP_PASS: z.string().min(1, 'SMTP Password is required'),

  EMAIL_FROM_NAME: z.string().default('Humble Office'),
  EMAIL_FROM_ADDRESS: z.string().email('Email from address is required'),
  EMAIL_REPLY_TO: z.string().email().optional().or(z.literal('')),
  ADMIN_EMAIL: z.string().email().optional().or(z.literal('')),
  SEND_ADMIN_NOTIFICATION: z.string().default('true').transform((val) => val === 'true'),

  RATE_LIMIT_MAX_REQUESTS: z.string().regex(/^\d+$/).default('5').transform(Number),
  RATE_LIMIT_WINDOW_MINUTES: z.string().regex(/^\d+$/).default('60').transform(Number),
  PHOTO_MAX_SIZE_MB: z.string().regex(/^\d+$/).default('5').transform(Number),
});

const parseEnv = () => {
  const isBuild = process.env.npm_lifecycle_event === 'build';
  if (isBuild || process.env.SKIP_ENV_VALIDATION === '1' || process.env.SKIP_ENV_VALIDATION === 'true') {
    return process.env as any;
  }
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
};

export const env = parseEnv();
