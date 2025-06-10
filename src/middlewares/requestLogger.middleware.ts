import { Request, Response, NextFunction } from 'express';
import { logRequestTime } from '../utils/logger';

export const requestLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      logRequestTime(req, res, duration);
    });
    
    next();
  };
};