import Koa = require('koa');
import Router = require('koa-router');
import swagger = require('swagger2');
import path = require('path');
import bodyParser = require('koa-bodyparser');
import ui = require('swagger2-koa');
import loggerMiddlware, { logger } from './logger/LoggerMiddleware';

import { initDbConnection } from './common/postgresProvider';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRoater from './resources/tasks/task.router';

const app = new Koa();
process
  .on('uncaughtException', (reason, p) => {
    logger.error({
      message: 'Unexpected error the progream is crushed: uncaughtException',
      reason,
    });
    logger.flushBuffers();

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  })
  .on('unhandledRejection', (err) => {
    logger.error({
      message: 'Unexpected error the progream is crushed: unhandledRejection',
      err,
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
  path.join(__dirname, '../../doc/api.yaml')
) as swagger.Document;

/**
 * The function for initialization before app is started
 */
async function init() {
  await initDbConnection();
}

app
  .use(bodyParser())
  .use(loggerMiddlware())
  .use(ui.ui(swaggerDocument, '/doc'))
  .use(userRouter.router.routes())
  .use(boardRouter.router.routes())
  .use(taskRoater.router.routes())
  .use(router.allowedMethods());

export { app, init };
export default { app };
