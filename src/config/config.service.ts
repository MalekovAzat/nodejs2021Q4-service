import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { Board } from '../entity/Board';
import { ColumnEntity } from '../entity/Column';
import { Task } from '../entity/Task';
import { User } from '../entity/User';

@Injectable()
export class ConfigService {
  constructor() {
    const envConfig = dotenv.parse(fs.readFileSync(`${process.env.PWD}/.env`));
    Object.assign(process.env, envConfig);
  }

  getDbConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_BASE,
      entities: [User, Task, ColumnEntity, Board],
      synchronize: false,
      migrationsRun: true,
      migrations: [__dirname + '../../migration/*.js'],
    };
  }

  get(name: string): string | number {
    return process.env[name];
  }
}
