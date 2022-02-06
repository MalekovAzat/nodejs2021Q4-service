import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({
  path: path.join(__dirname, '/../../../.env'),
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
// logs env variables
const ERROR_LOG_FILE = path.join(logsPath, process.env.ERROR_LOG_FILE as string)
  || path.join(logsPath, 'error-logs.txt');
const COMMON_LOG_FILE = path.join(logsPath, process.env.COMMON_LOG_FILE as string)
  || path.join(logsPath, 'logs.txt');
const CONSOLE_LOG = process.env.CONSOLE_LOG === 'true';

// postgres env variables
const { PG_USER } = process.env;
const { PG_PASSWORD } = process.env;
const { PG_HOST } = process.env;
const PG_PORT = parseInt(process.env.PG_PORT as string, 10);
const { PG_BASE } = process.env;

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
  PG_USER,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  PG_BASE,
};

export default {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  PG_USER,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  PG_BASE,
};
