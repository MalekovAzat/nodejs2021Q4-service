import Router = require('koa-router');

import boardsService from './board.service';

import { BoardProperties } from './board.model';

const router = new Router({ prefix: '/boards' });

router.use(
  /**
   * The function sets respose type to application/json
   * @param ctx Koa context
   * @param next Callbach which should be called at the end of mw function
   */
  async (ctx, next) => {
    ctx.type = 'application/json';
    next();
  }
);

router.get(
  '/',
  /**
   * The function which handles get request and returns all boards
   * @param ctx Koa context
   */
  async (ctx) => {
    const boards = await boardsService.getAll();

    ctx.body = boards;
    ctx.status = 200;
  }
);

router.get(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  /**
   * The function which handles get request and returns board by provided id
   * @param ctx Koa context
   */
  async (ctx) => {
    const { id } = ctx.params;

    const board = await boardsService.getById({ id });

    if (board !== undefined) {
      ctx.body = board;
      ctx.status = 200;
    } else {
      ctx.body = { message: `Board with id ${id} is not found` };
      ctx.status = 404;
    }
  }
);

router.post(
  '/',
  /**
   * The function which handles post request and returns created board
   * @param ctx
   */
  async (ctx) => {
    const { title, columns } = ctx.request.body as BoardProperties;
    const board = await boardsService.create({ title, columns });

    ctx.body = board;
    ctx.status = 201;
  }
);

router.put(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  /**
   * The function which handles put request and returns updated board
   * @param ctx Koa context
   */
  async (ctx) => {
    const { id } = ctx.params;
    const { title, columns } = ctx.request.body as BoardProperties;

    const board = await boardsService.update({ id, title, columns });

    if (board !== undefined) {
      ctx.body = board;
      ctx.status = 200;
    } else {
      ctx.body = { message: `Board with id ${id} is not found` };
      ctx.status = 404;
    }
  }
);

router.delete(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  /**
   * The functions which handles delete request and delete board by id
   * @param ctx Koa context
   */
  async (ctx) => {
    const { id } = ctx.params;

    const deleted = await boardsService.deleteBoard({ id });

    if (deleted) {
      ctx.body = { message: 'The board has been deleted' };
      ctx.status = 204;
    } else {
      ctx.body = { message: `Board with provided id ${id} is not found` };
      ctx.status = 404;
    }
  }
);

export { router };
export default { router };
