import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { UserAuth } from '../config/types.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return next(new Error('Missing or invalid authorization header'
));
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret) as UserAuth;

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new Error('Invalid or expired token'
));
    }

    next(error);
  }
};

export const authorize = (requiredRole: UserAuth['role']) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new Error('User not authenticated'
));
    }

    if (req.user.role !== requiredRole && req.user.role !== 'admin') {
      return next(new Error(`Required role: ${requiredRole}`
));
    }

    next();
  };
};

export const checkPermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new Error('User not authenticated'
));
    }

    if (!req.user.permissions.includes(requiredPermission) && req.user.role !== 'admin') {
      return next(new Error(`Required permission: ${requiredPermission}`
));
    }

    next();
  };
};
