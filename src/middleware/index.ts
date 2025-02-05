import { Request, Response, NextFunction } from 'express';
import { authenticate, authorize, checkPermission } from './auth.middleware.js';
import {
  defaultRateLimit,
  authRateLimit,
  analyticsRateLimit
} from './rate-limit.middleware.js';
import {
  errorHandler,
  notFoundHandler,
  asyncHandler,
  validationErrorHandler,
  APIError
} from './error.middleware.js';

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export {
  authenticate,
  authorize,
  checkPermission,
  defaultRateLimit,
  authRateLimit,
  analyticsRateLimit,
  errorHandler,
  notFoundHandler,
  asyncHandler,
  validationErrorHandler,
  APIError
};

// Convenience function to compose multiple middleware
export const composeMiddleware = (...middleware: MiddlewareFunction[]) => {
  return middleware.reduce((a, b) => async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await a(req, res, async (err?: any) => {
        if (err) return next(err);
        try {
          await b(req, res, next);
        } catch (err) {
          next(err);
        }
      });
    } catch (err) {
      next(err);
    }
  });
};

// Commonly used middleware combinations
export const securedRoute = composeMiddleware(
  authenticate,
  defaultRateLimit
);

export const analyticsRoute = composeMiddleware(
  authenticate,
  analyticsRateLimit,
  authorize('analyst')
);

export const adminRoute = composeMiddleware(
  authenticate,
  authorize('admin')
);
