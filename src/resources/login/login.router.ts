import Router = require('koa-router');
import { LoginCredentials } from './login.interfaces';

import loginService from './login.service';

const router = new Router({ prefix: '/login' });

router.use(
  /**
   * The function sets respose type to application/json
   * @param ctx - Koa context
   * @param next - Callbach which should be called at the end of mw function
   */
  async (ctx, next) => {
    ctx.type = 'application/json';
    await next();
  },
);

router.post(
  '/',
  /**
   * The function should be used to get JWT token to access to protected api endpoints
   * @param ctx - Koa context
   */
  async (ctx) => {
    const { login, password } = ctx.request.body as LoginCredentials;

    const jwtToken = await loginService.handleLoginRequest({
      login,
      password,
    });
    if (jwtToken !== undefined) {
      ctx.body = { token: jwtToken };
      ctx.status = 200;
    } else {
      ctx.status = 403;
    }
  },
);

export { router };
export default { router };
