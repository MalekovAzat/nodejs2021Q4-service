import 'reflect-metadata';
import { Connection, createConnection, EntityTarget } from 'typeorm';

import { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_BASE } from './config';

import { User } from '../entity/User';
import { Board } from '../entity/Board';
import { ColumnEntity } from '../entity/Column';
import { Task } from '../entity/Task';
import { logger } from '../logger/LoggerMiddleware';

let connection: unknown | Connection = null;
const CONNECTION_TIMEOUT = 5000;

function connect() {
  return createConnection({
    type: 'postgres',
    port: PG_PORT,
    host: PG_HOST,
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_BASE,
    entities: [User, Task, Board, ColumnEntity],
    synchronize: false,
  });
}

export function enstablishConnection() {
  logger.debug({
    message: `Enstablish connection with ${PG_HOST}:${PG_PORT}`,
  });
  connect()
    .catch((error) => {
      logger.error({
        message: `Connection to ${PG_HOST}:${PG_PORT}`,
        reason: error.message,
      });
      setTimeout(enstablishConnection, CONNECTION_TIMEOUT);
    })
    .then((enstablishedConnection) => {
      logger.debug({
        message: `Successfully connected to ${PG_HOST}:${PG_PORT}`,
      });
      connection = enstablishedConnection;
    });
}

export function getRepository(entity: EntityTarget<unknown>) {
  return (connection as Connection).getRepository(entity);
}
