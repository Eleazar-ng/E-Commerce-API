import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'staging']),
  PORT: z.string().transform(Number).default(1739),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1d'),
  APP_URL: z.string().max(8),
})

export const env = envSchema.parse(process.env);