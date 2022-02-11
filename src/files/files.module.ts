import { Module } from '@nestjs/common';
import { FilesController as FilesExpressController } from './files.express.controller';
import { FilesController as FilesFastifyController } from './files.fastify.controller';

const useFastify = process.env.USE_FASTIFY !== 'false';

const filesController = useFastify
  ? FilesFastifyController
  : FilesExpressController;

@Module({
  controllers: [filesController],
})
export class FilesModule {}
