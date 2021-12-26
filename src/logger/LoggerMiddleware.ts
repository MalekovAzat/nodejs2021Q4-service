import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import Logger from './Logger';

import {
  LOG_LEVEL,
  ERROR_LOG_FILE,
  COMMON_LOG_FILE,
  CONSOLE_LOG,
} from '../common/config';

export const logger = new Logger(
  ERROR_LOG_FILE,
  COMMON_LOG_FILE,
  CONSOLE_LOG,
  LOG_LEVEL,
);

/**
 * The function which creates logger middlware
 */
export default function loggerMiddlware(): (
  ctx: Context,
  next: Next
) => Promise<void> {
  const loggerInteral = logger;

  /**
   * The function which handles get request and returns all users
   * @param ctx - Koa context
   * @param next - The callback to call to go to next mw
   */
  return async function (ctx: Context, next: Next) {
    const reqId = uuidv4();

    loggerInteral.error({
      id: reqId,
      url: ctx.request.url,
      reqBody: ctx.request.body,
      reqQueryParam: ctx.request.query,
    });

    loggerInteral.warning({
      id: reqId,
      url: ctx.request.url,
      reqBody: ctx.request.body,
      reqQueryParam: ctx.request.query,
    });

    loggerInteral.info({
      id: reqId,
      url: ctx.request.url,
      reqBody: ctx.request.body,
      reqQueryParam: ctx.request.query,
    });

    loggerInteral.debug({
      id: reqId,
      url: ctx.request.url,
      reqBody: ctx.request.body,
      reqQueryParam: ctx.request.query,
    });
    try {
      await next();
    } catch (e) {
      ctx.body = `Unexpected error: ${(e as Error).message}`;
      ctx.status = 500;
    }
    loggerInteral.info({
      id: reqId,
      status: ctx.response.status,
      resBody: ctx.body,
    });
  };
}
