import winston from 'winston';
import { TransformableInfo } from 'logform';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ENVIRONMENT, LOGS_DIR } from './config/env';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  sql: 5
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
  sql: 'cyan'
};

import { Request, Response } from 'express';
export const logRequestTime = (req: Request, res: Response, time: number) => {
  logger.http(`${req.method} ${req.url} ${res.statusCode} ${time}ms`, {
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: time,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    referrer: req.headers.referer,
    contentType: res.get('Content-Type'),
    contentLength: res.get('Content-Length') || '0',
  });
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info: TransformableInfo) => 
      `${info.timestamp} [${info.level}] ${info.message} ${info.stack || ''}`
  )
);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  format
);

const transports = [
  new winston.transports.Console({
    format: consoleFormat,
    level: ENVIRONMENT === 'development' ? 'debug' : 'info'
  }),
  new DailyRotateFile({
    filename: `${LOGS_DIR}/error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error'
  }),
  new DailyRotateFile({
    filename: `${LOGS_DIR}/combined-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  })
];

const Logger = winston.createLogger({
  level: 'debug',
  levels,
  format,
  transports,
  exceptionHandlers: [
    new DailyRotateFile({
      filename: `${LOGS_DIR}/exceptions-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: `${LOGS_DIR}/rejections-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

interface ILogger {
  error(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  http(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
  sql(message: string, meta?: any): void;
  stream?: { write: (message: string) => void };
}

const logger: ILogger = {
  error: (message: string, meta?: any) => Logger.log('error', message, meta),
  warn: (message: string, meta?: any) => Logger.log('warn', message, meta),
  info: (message: string, meta?: any) => Logger.log('info', message, meta),
  http: (message: string, meta?: any) => Logger.log('http', message, meta),
  debug: (message: string, meta?: any) => Logger.log('debug', message, meta),
  sql: (message: string, meta?: any) => Logger.log('sql', message, meta),
  stream: { write: (message: string) => Logger.http(message.trim()) }
};

export default logger;