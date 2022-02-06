import { ParameterizedContext, Next } from 'koa';
import passport from 'koa-passport';
import { Strategy as JwtStrategy, JwtFromRequestFunction } from 'passport-jwt';

import { Request } from 'express';
import { JWT_SECRET_KEY } from '../../../common/config';
import { isLoginExist } from '../login.service';

export const strategyName = 'JwtStrategy';

/**
 * The function for extracting of jwt token from Auth header
 * @param req - The request to server
 * @returns jwt token
 */
function jwtFromRequest(req: Request): string | null {
  if (!('authorization' in req.headers)) {
    return null;
  }
  const splitedAuthHeader = req.headers.authorization?.split(' ');

  if ((splitedAuthHeader as string[]).length !== 2) {
    return null;
  }

  const jwt = (splitedAuthHeader as string[])[1];

  if (!/(^[\w-]*\.[\w-]*\.[\w-]*$)/.test(jwt)) {
    return null;
  }
  return jwt;
}

export function initiateStrategies() {
  passport.use(
    strategyName,
    new JwtStrategy(
      {
        secretOrKey: JWT_SECRET_KEY,
        jwtFromRequest: jwtFromRequest as JwtFromRequestFunction,
      },
      /**
       * The function is used to check is logined user exist in the system
       * @param payload - Decoded token payload
       * @param done - The callback to call when check done
       * @returns result of done() call
       */
      async (payload, done) => {
        const { login } = payload;

        let loginExist: boolean;
        try {
          loginExist = await isLoginExist({ login });
        } catch (e) {
          return done(e);
        }
        return done(null, loginExist ? login : false);
      },
    ),
  );
}

export function authenticate(startegy: string) {
  /**
   * Autentificate middlware for koa framework
   * @param ctx - Koa context
   * @param next - Next callback to call
   */
  return async (ctx: ParameterizedContext, next: Next) => {
    await passport.authenticate(
      startegy,
      { session: false },
      async (err: Error | null | string, login: string | boolean) => {
        if (err) {
          throw err;
        }
        if (login === false) {
          ctx.status = 401;
        } else {
          await next();
        }
      },
    )(ctx, next);
  };
}

export default {
  strategyName,
  initiateStrategies,
  authenticate,
};
