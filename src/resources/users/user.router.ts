import Router = require('koa-router');

import usersService from './user.service';

import { UserProperties } from './user.model';

const router = new Router({ prefix: '/users' });

router.use(async (ctx, next) => {
  ctx.type = 'application/json';
  next();
});

router.get('/', async (ctx) => {
  const users = await usersService.getAll();

  ctx.body = users;
  ctx.status = 200;
});

router.get(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  async (ctx) => {
    const { id } = ctx.params;

    const user = await usersService.getById({ id });

    if (user !== undefined) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.body = { message: `User wiht id ${id} is not found` };
      ctx.status = 404;
    }
  },
);

router.post('/', async (ctx) => {
  const { name, login, password } = ctx.request.body as UserProperties;

  const user = await usersService.create({ name, login, password });

  ctx.body = user;
  ctx.status = 201;
});

router.put(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  async (ctx) => {
    const { id } = ctx.params;
    const { name, login, password } = ctx.request.body as UserProperties;

    const user = await usersService.update({
      id,
      name,
      login,
      password,
    });

    if (user !== undefined) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.body = { message: `User with provided id ${id} is not found` };
      ctx.status = 404;
    }
  },
);

router.delete(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  async (ctx) => {
    const { id } = ctx.params;

    const deleted = await usersService.deleteUser({ id });

    if (deleted) {
      ctx.body = { message: 'The user has been deleted' };
      ctx.status = 204;
    } else {
      ctx.body = { message: `User with provided id ${id} is not found` };
      ctx.status = 404;
    }
  },
);

export { router };
export default { router };
