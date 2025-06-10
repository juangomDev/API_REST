import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import logger from '../logger';
import { requestLogger } from '../../middlewares/requestLogger.middleware';

export const configureExpress = (app: Application): void => {
  // Middlewares básicos
  app.use(requestLogger());
  app.use(helmet());
  app.use(cors());
  
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  
  // Logging
  app.use(morgan('combined', { 
    stream: logger.stream,
    skip: (req) => req.path === '/health'
  }));
};