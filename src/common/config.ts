import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

const PORT = process.env.PORT || '5000';
const { NODE_ENV } = process.env;
const { MONGO_CONNECTION_STRING } = process.env;
const { JWT_SECRET_KEY } = process.env;
const AUTH_MODE = process.env.AUTH_MODE === 'true';
const LOG_LEVEL = Number(process.env.LOG_LEVEL);

const logsPath = path.join(__dirname, '../../../logs');
if (!fs.existsSync(logsPath)) {
  fs.mkdirSync(logsPath);
}

const ERROR_LOG_FILE = path.join(logsPath, process.env.ERROR_LOG_FILE as string)
  || path.join(logsPath, 'error-logs.txt');
const COMMON_LOG_FILE = path.join(logsPath, process.env.COMMON_LOG_FILE as string)
  || path.join(logsPath, 'logs.txt');
const CONSOLE_LOG = process.env.CONSOLE_LOG === 'true';
export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  LOG_LEVEL,
  ERROR_LOG_FILE,
  COMMON_LOG_FILE,
  CONSOLE_LOG,
};

export default {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
};
