import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env if present
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/meghpiyon'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  API_PREFIX: z.string().default('/api/v1'),
  JWT_SECRET: z.string().default('meghpiyon-atelier-super-secret-jwt-key-2026'),
  JWT_EXPIRES_IN_SECONDS: z.coerce.number().default(60 * 60 * 24 * 7),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
