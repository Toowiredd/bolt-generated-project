import dotenv from 'dotenv';
import { ServerConfig } from './types.js';

// Load environment variables
dotenv.config();

function validateEnv(): void {
  const required = [
    'NODE_ENV',
    'PORT',
    'JWT_SECRET',
    'VALTOWN_API_KEY',
    'VALTOWN_ENDPOINT'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

function loadConfig(): ServerConfig {
  validateEnv();

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    jwtSecret: process.env.JWT_SECRET!,
    rateLimits: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes default
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10) // 100 requests default
    },
    valtown: {
      apiKey: process.env.VALTOWN_API_KEY!,
      endpoint: process.env.VALTOWN_ENDPOINT!
    }
  };
}

export const config = loadConfig();

// Export individual config values for convenience
export const {
  nodeEnv,
  port,
  jwtSecret,
  rateLimits,
  valtown
} = config;
