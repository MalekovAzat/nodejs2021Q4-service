export interface EnvConfig {
  COMMON_LOG_FILE: string;
  CONSOLE_LOG: string;

  ERROR_LOG_FILE: string;
  JWT_SECRET_KEY: string;
  LOG_LEVEL: string;
  PG_BASE: string;

  PG_HOST: string;
  PG_PASSWORD: string;
  PG_PORT: string;
  PG_USER: string;
  PORT: string;
}
