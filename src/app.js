const Koa = require('koa');
const KoaRouter = require('koa-router');
const swagger = require('swagger2');
const path = require('path');
const bodyParser = require('koa-bodyparser');

const { ui } = require('swagger2-koa');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRoater = require('./resources/tasks/task.router');

const app = new Koa();
const router = new KoaRouter();

const swaggerDocument = swagger.loadDocumentSync(
  path.join(__dirname, '../doc/api.yaml')
);

app
  .use(bodyParser())
  .use(ui(swaggerDocument, '/doc'))
  .use(userRouter.routes())
  .use(boardRouter.routes())
  .use(taskRoater.routes())
  .use(router.allowedMethods());

module.exports = app;
