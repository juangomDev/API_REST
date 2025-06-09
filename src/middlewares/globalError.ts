
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errorHandler';

export const globalErrorHandler = (
  err: Error | ApiError, 
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Ha ocurrido un error inesperado en el servidor.';

  res.status(statusCode).json({
    status: 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};