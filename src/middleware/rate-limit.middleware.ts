import rateLimit from 'express-rate-limit';
import { config } from '../config/config.js';

// Default rate limit configuration
export const defaultRateLimit = rateLimit({
  windowMs: config.rateLimits.windowMs,
  max: config.rateLimits.maxRequests,
  message: {
    error: 'Too many requests',
    message: 'Please try again later',
    retryAfter: Math.ceil(config.rateLimits.windowMs / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for authentication endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per windowMs
  message: {
    error: 'Too many authentication attempts',
    message: 'Please try again later',
    retryAfter: 900 // 15 minutes in seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit for analytics generation
export const analyticsRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 analytics generations per hour
  message: {
    error: 'Analytics generation rate limit exceeded',
    message: 'Please try again later',
    retryAfter: 3600 // 1 hour in seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
});
