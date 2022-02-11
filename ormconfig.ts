import path from 'path';
import dotenv from 'dotenv';
import { EnvConfig } from 'src/config/config.interfaces';

const config = dotenv.config({
  path: path.join(__dirname, '.env'),
}) as EnvConfig;

module.exports = {
  type: 'postgres',
  host: config.PG_HOST,
  port: +config.PG_PORT,
  username: config.PG_USER,
  password: config.PG_PASSWORD,
  database: config.PG_BASE,
  synchronize: false,
  logging: true,
  entities: ['./src/entity/*.ts'],
  migrationsTableName: 'migrations',
  migrations: ['./migration/*.ts'],
  cli: {
    migrationsDir: './migration',
  },
};
