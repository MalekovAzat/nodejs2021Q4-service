import 'reflect-metadata';
import { Connection, createConnection, EntityTarget } from 'typeorm';

import { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_BASE } from './config';

import { User } from '../entity/User';
import { Board } from '../entity/Board';
import { ColumnEntity } from '../entity/Column';
import { Task } from '../entity/Task';
import { logger } from '../logger/LoggerMiddleware';

let connection: unknown | Connection = null;

export async function initDbConnection(): Promise<Connection> {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  while (connection === null || connection === undefined) {
    logger.debug({
      message: 'Try to connect to postgres db',
    });
    console.log(PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_BASE);
    connection = await createConnection({
      type: 'postgres',
      port: PG_PORT,
      host: PG_HOST,
      username: PG_USER,
      password: PG_PASSWORD,
      database: PG_BASE,
      entities: [User, Task, Board, ColumnEntity],
      synchronize: false,
    }).catch((e) => {
      logger.error({
        message: 'Connection to db failed',
        reason: e.message,
      });
    });

    await delay(5000);
  }
  logger.debug({
    message: 'Successfully connected to db',
  });

  return connection as Connection;
}

export function getRepository(entity: EntityTarget<unknown>) {
  return (connection as Connection).getRepository(entity);
}
