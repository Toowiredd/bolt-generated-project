import { Request, Response, NextFunction } from 'express';
import {
  errorHandler,
  notFoundHandler,
  APIError,
  validationErrorHandler
} from '../error.middleware.js';
import { config } from '../../config/config.js';

describe('Error Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockReq = {
      method: 'GET',
      path: '/test',
      originalUrl: '/test'
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
  });

  describe('errorHandler', () => {
    it('should handle APIError with proper status code', () => {
      const apiError = new APIError(400, 'Bad Request', { field: 'invalid' });

      errorHandler(
        apiError,
        mockReq as Request,
        mockRes as Response,
        nextFunction
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'APIError',
        message: 'Bad Request',
        details: { field: 'invalid' }
      });
    });

    it('should handle generic errors as 500 internal server error', () => {
      const error = new Error('Something went wrong');

      errorHandler(
        error,
        mockReq as Request,
        mockRes as Response,
        nextFunction
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Error',
        message: 'Something went wrong',
        ...(config.nodeEnv === 'development' && { stack: error.stack })
      });
    });
  });

  describe('notFoundHandler', () => {
    it('should create 404 error for non-existent routes', () => {
      notFoundHandler(
        mockReq as Request,
        mockRes as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 404,
          message: 'Route not found: GET /test'
        })
      );
    });
  });

  describe('validationErrorHandler', () => {
    it('should handle validation errors', () => {
      const validationError = new Error('Invalid data');
      validationError.name = 'ValidationError';

      validationErrorHandler(
        validationError,
        mockReq as Request,
        mockRes as Response,
        nextFunction
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'ValidationError',
        message: 'Invalid request data',
        details: validationError.message
      });
    });

    it('should pass non-validation errors to next error handler', () => {
      const error = new Error('Different error');

      validationErrorHandler(
        error,
        mockReq as Request,
        mockRes as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('APIError', () => {
    it('should create error with status code and details', () => {
      const error = new APIError(403, 'Forbidden', { reason: 'unauthorized' });

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('APIError');
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Forbidden');
      expect(error.details).toEqual({ reason: 'unauthorized' });
    });
  });
});
