import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import fastifyMultipart from 'fastify-multipart';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { CustomExceptionFilter } from './CustomExceptionFilter/exceptionFilter';

async function bootstrap() {
  const useFastify = process.env.USE_FASTIFY !== 'false';

  const app = useFastify
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        { logger: ['error', 'warn', 'log', 'debug', 'verbose'] },
      )
    : await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new CustomExceptionFilter(configService));
  if (useFastify) {
    (app as NestFastifyApplication).register(fastifyMultipart);
  }
  app.enableCors();
  const port = configService.get('PORT');

  await app.listen(port, '0.0.0.0');
}
bootstrap();
