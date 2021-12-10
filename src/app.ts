import Koa = require('koa');
import Router = require('koa-router');
import swagger = require('swagger2');
import path = require('path');
import bodyParser = require('koa-bodyparser');
import ui = require('swagger2-koa');

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRoater from './resources/tasks/task.router';

const app = new Koa();
const router = new Router();

const swaggerDocument = swagger.loadDocumentSync(
  path.join(__dirname, '../../doc/api.yaml')
) as swagger.Document;

app
  .use(bodyParser())
  .use(ui.ui(swaggerDocument, '/doc'))
  .use(userRouter.router.routes())
  .use(boardRouter.router.routes())
  .use(taskRoater.router.routes())
  .use(router.allowedMethods());

export { app };
export default { app };
