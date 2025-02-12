import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { UserAuth } from '../config/types.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'Missing or invalid authorization header'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret) as UserAuth;

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid or expired token'
      });
    }

    next(error);
  }
};

export const authorize = (requiredRole: UserAuth['role']) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({
        error: 'Authorization failed',
        message: 'User not authenticated'
      });
    }

    if (req.user.role !== requiredRole && req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Authorization failed',
        message: `Required role: ${requiredRole}`
      });
    }

    next();
  };
};

export const checkPermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({
        error: 'Authorization failed',
        message: 'User not authenticated'
      });
    }

    if (!req.user.permissions.includes(requiredPermission) && req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Authorization failed',
        message: `Required permission: ${requiredPermission}`
      });
    }

    next();
  };
};
