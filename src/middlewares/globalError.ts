import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/error/errorHandler';
import logger from '../utils/logger';

export const globalErrorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log del error
  logger.error(`${err.name}: ${err.message}`, {
    url: req.originalUrl,
    method: req.method,
    stack: err.stack
  });

  // Manejo de errores conocidos
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Error inesperado
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};