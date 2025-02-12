import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, authorize, checkPermission } from '../auth.middleware.js';
import { config } from '../../config/config.js';
import { UserAuth } from '../../config/types.js';

// Mock jwt module
jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
  });

  describe('authenticate', () => {
    it('should authenticate valid token', () => {
      const mockUser: UserAuth = {
        id: '123',
        role: 'analyst',
        permissions: ['read:analytics']
      };

      mockReq.headers = {
        authorization: 'Bearer valid-token'
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockUser);

      authenticate(mockReq as Request, mockRes as Response, nextFunction);

      expect(jwt.verify).toHaveBeenCalledWith('valid-token', config.jwtSecret);
      expect(mockReq.user).toEqual(mockUser);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should reject missing token', () => {
      authenticate(mockReq as Request, mockRes as Response, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Authentication required',
        message: 'Missing or invalid authorization header'
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject invalid token', () => {
      mockReq.headers = {
        authorization: 'Bearer invalid-token'
      };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new jwt.JsonWebTokenError('Invalid token');
      });

      authenticate(mockReq as Request, mockRes as Response, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Authentication failed',
        message: 'Invalid or expired token'
      });
    });
  });

  describe('authorize', () => {
    it('should allow admin access to any role', () => {
      mockReq.user = {
        id: '123',
        role: 'admin',
        permissions: []
      };

      const authorizeAnalyst = authorize('analyst');
      authorizeAnalyst(mockReq as Request, mockRes as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should reject unauthorized role', () => {
      mockReq.user = {
        id: '123',
        role: 'viewer',
        permissions: []
      };

      const authorizeAnalyst = authorize('analyst');
      authorizeAnalyst(mockReq as Request, mockRes as Response, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Authorization failed',
        message: 'Required role: analyst'
      });
    });

    it('should reject missing req.user', () => {
      const authorizeAnalyst = authorize('analyst');
      authorizeAnalyst(mockReq as Request, mockRes as Response, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Authorization failed',
        message: 'User not authenticated'
      });
    });
  });

  describe('checkPermission', () => {
    it('should allow access with required permission', () => {
      mockReq.user = {
        id: '123',
        role: 'analyst',
        permissions: ['read:analytics']
      };

      const checkAnalyticsPermission = checkPermission('read:analytics');
      checkAnalyticsPermission(mockReq as Request, mockRes as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should reject without required permission', () => {
      mockReq.user = {
        id: '123',
        role: 'analyst',
        permissions: []
      };

      const checkAnalyticsPermission = checkPermission('read:analytics');
      checkAnalyticsPermission(mockReq as Request, mockRes as Response, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Authorization failed',
        message: 'Required permission: read:analytics'
      });
    });

    it('should reject missing req.user', () => {
      const checkAnalyticsPermission = checkPermission('read:analytics');
      checkAnalyticsPermission(mockReq as Request, mockRes as Response, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Authorization failed',
        message: 'User not authenticated'
      });
    });
  });
});
