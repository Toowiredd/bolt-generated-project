import { logError } from '../services/loggingService';

export class AppError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): { message: string; statusCode: number } => {
  if (error instanceof AppError) {
    logError(error);
    return { message: error.message, statusCode: error.statusCode };
  } else if (error instanceof Error) {
    logError(error);
    return { message: 'An unexpected error occurred', statusCode: 500 };
  } else {
    const unknownError = new Error('An unknown error occurred');
    logError(unknownError);
    return { message: 'An unknown error occurred', statusCode: 500 };
  }
};
