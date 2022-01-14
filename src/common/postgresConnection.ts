import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import { User } from '../entity/User';

let connection: unknown | Connection = null;

export async function getConnection(): Promise<Connection> {
  if (connection === null) {
    connection = await createConnection({
      type: 'postgres',
      port: 5432,
      host: 'postgres',
      username: 'admin',
      password: 'password',
      database: 'test',
      entities: [User],
      synchronize: true,
    });
  }
  return connection as Connection;
}
