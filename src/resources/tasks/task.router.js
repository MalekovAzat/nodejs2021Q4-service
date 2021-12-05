const KoaRouter = require('koa-router');
const taskService = require('./task.service');

const router = new KoaRouter({
  prefix:
    '/boards/:boardId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/tasks',
});

router.get('/', async (ctx) => {
  const tasks = await taskService.getAll();

  ctx.body = tasks;
  ctx.status = 200;
});

router.get(
  '/:taskId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  async (ctx) => {
    const id = ctx.params.taskId;

    const task = await taskService.getById({ id });

    if (task !== undefined) {
      ctx.body = task;
      ctx.status = 200;
    } else {
      ctx.body = { message: `Task wiht id ${id} is not found` };
      ctx.status = 404;
    }
  }
);

router.post('/', async (ctx) => {
  const {
    title,
    order,
    description,
    userId, // assignee
    columnId,
  } = ctx.request.body;

  const { boardId } = ctx.params;

  const task = await taskService.create({
    title,
    order,
    description,
    userId, // assignee
    boardId,
    columnId,
  });

  ctx.body = task;
  ctx.status = 201;
});

router.put(
  '/:taskId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  async (ctx) => {
    const id = ctx.params.taskId;
    const { boardId } = ctx.params;
    const { title, order, description, userId, columnId } = ctx.request.body;

    const user = await taskService.update({
      id,
      title,
      order,
      description,
      userId, // assignee
      boardId,
      columnId,
    });

    if (user !== undefined) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.body = { message: `Task with id ${id} not found` };
      ctx.status = 404;
    }
  }
);

router.delete(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  async (ctx) => {
    const { id } = ctx.params;

    const deleted = await taskService.deleteTask({ id });

    if (deleted) {
      ctx.body = { message: 'The user has been deleted' };
      ctx.status = 204;
    } else {
      ctx.body = { message: `Task with id ${id} not found` };
      ctx.status = 404;
    }
  }
);

module.exports = router;
