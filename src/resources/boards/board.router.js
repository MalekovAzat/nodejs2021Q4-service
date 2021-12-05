const KoaRouter = require('koa-router');
const boardsService = require('./board.service');

const router = new KoaRouter({ prefix: '/boards' });

router.use(async (ctx, next) => {
  ctx.type = 'application/json';
  next();
});

router.get('/', async (ctx) => {
  const boards = await boardsService.getAll();

  ctx.body = boards;
  ctx.status = 200;
});

router.get(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
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

router.post('/', async (ctx) => {
  const { title, columns } = ctx.request.body;
  const board = await boardsService.create({ title, columns });

  ctx.body = board;
  ctx.status = 201;
});

router.put(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  async (ctx) => {
    const { id } = ctx.params;
    const { title, columns } = ctx.request.body;

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

module.exports = router;
