import {
  CallHandler,
  ExecutionContext,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import MulterFactory from 'fastify-multer';
import { Multer } from 'multer';

export function FastifyFileInterceptor(
  fieldName: string,
  localOptions,
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: Multer;

    constructor() {
      this.multer = MulterFactory(localOptions) as unknown as Multer;
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
      const ctx = context.switchToHttp();

      await new Promise<void>((resolve, reject) => {
        this.multer.single(fieldName)(
          ctx.getRequest(),
          ctx.getResponse(),
          (error) => {
            if (error) {
              // const error = transformException(err);
              reject(error);
            }
            resolve();
          },
        );
      });

      return next.handle();
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}
