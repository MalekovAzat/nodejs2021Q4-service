import Koa = require('koa');
import Router = require('koa-router');
import swagger = require('swagger2');
import path = require('path');
import bodyParser = require('koa-bodyparser');
import ui = require('swagger2-koa');
import passport from 'koa-passport';
import loggerMiddlware, { logger } from './logger/LoggerMiddleware';

import { enstablishConnection } from './common/postgresProvider';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRoater from './resources/tasks/task.router';
import loginRouter from './resources/login/login.router';

import {
  initiateStrategies,
  authenticate,
} from './resources/login/strategy/login.strategy';

import { putTestUserToDb } from './resources/users/user.service';
import { NODE_ENV } from './common/config';

initiateStrategies();

const app = new Koa();
process
  .on('uncaughtException', (reason) => {
    logger.error({
      message: 'Unexpected error the progream is crushed: uncaughtException',
      reason,
    });
    logger.flushBuffers();

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  })
  .on('unhandledRejection', (err, p) => {
    logger.error({
      message: 'Unexpected error the progream is crushed: unhandledRejection',
      err: (err as Error).message,
      p,
    });

    logger.flushBuffers();

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

// check of handlers
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

const router = new Router();

const swaggerDocument = swagger.loadDocumentSync(
  path.join(__dirname, '../../doc/api.yaml'),
) as swagger.Document;

/**
 * The function for initialization before app is started
 */
async function init() {
  await enstablishConnection();
  if (NODE_ENV === 'development') {
    try {
      await putTestUserToDb();
      logger.debug({
        message: 'TEST USER SUCCESSFULLY CREATED',
      });
    } catch (e) {
      if (
        (e as Error).name === 'QueryFailedError'
        && (e as Error).message === 'relation "user" does not exist'
      ) {
        logger.error({
          message: 'PLEASE RUN MIGRATION FOR DB',
        });
        throw new Error('User table does not exist. Run Migrations');
      } else if ((e as Error).name === 'QueryFailedError') {
        logger.debug({
          message: 'Test user already exist',
        });
      }
    }
  }
}

app
  .use(loggerMiddlware())
  .use(bodyParser())
  .use(passport.initialize())
  .use(ui.ui(swaggerDocument, '/doc'))
  .use(loginRouter.router.routes())
  .use(authenticate('JwtStrategy'))
  .use(userRouter.router.routes())
  .use(boardRouter.router.routes())
  .use(taskRoater.router.routes())
  .use(router.allowedMethods());

export { app, init };
export default { app };
