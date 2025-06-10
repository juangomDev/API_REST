import dotenv from 'dotenv';

dotenv.config();

export const  ENVIRONMENT = process.env.ENVIRONMENT || 'development';
export const LOGS_DIR = process.env.LOGS_DIR || 'logs'
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development'

import fs from 'fs';

if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}