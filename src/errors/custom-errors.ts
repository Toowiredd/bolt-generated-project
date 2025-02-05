export class ValidationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

export class ServiceError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = 500;
  }
}
