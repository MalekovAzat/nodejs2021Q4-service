import Router = require('koa-router');

import { TaskInterface } from './task.interfaces';

import taskService from './task.service';

const router = new Router({
  prefix:
    '/boards/:boardId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/tasks',
});

router.use(
  /**
   * The function sets respose type to application/json
   * @param ctx - Koa context
   * @param next - Callbach which should be called at the end of mw function
   */
  async (ctx, next) => {
    ctx.type = 'application/json';
    await next();
  }
);

router.get(
  '/',
  /**
   * The function which handles get request and returns all tasks
   * @param ctx - Koa context
   */
  async (ctx) => {
    const tasks = await taskService.getAll();

    ctx.body = tasks;
    ctx.status = 200;
  }
);

router.get(
  '/:taskId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  /**
   * The function which handles get request and returns tasks by provided id
   * @param ctx - Koa context
   */
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

router.post(
  '/',
  /**
   * The function which handles post request and returns created task
   * @param ctx-
   */
  async (ctx) => {
    const {
      title,
      order,
      description,
      userId, // assignee
      columnId,
    } = ctx.request.body as TaskInterface;

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
  }
);

router.put(
  '/:taskId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  /**
   * The function which handles put request and returns updated task
   * @param ctx - Koa context
   */
  async (ctx) => {
    const id = ctx.params.taskId;
    const { boardId } = ctx.params;
    const { title, order, description, userId, columnId } = ctx.request
      .body as TaskInterface;

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
  /**
   * The functions which handles delete request and delete task by id
   * @param ctx - Koa context
   */
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

export { router };
export default { router };
