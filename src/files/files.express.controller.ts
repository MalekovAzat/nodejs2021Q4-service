import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Param,
  StreamableFile,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { existsSync, createReadStream } from 'fs';
import * as multer from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('file')
@UseGuards(JwtAuthGuard)
export class FilesController {
  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      dest: './files',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { originalName: file.originalname, filename: file.filename };
  }

  @Get('/:name')
  getFile(@Param('name') name: string): StreamableFile {
    const path = `./files/${name}`;

    if (existsSync(path)) {
      const file = createReadStream(path);
      return new StreamableFile(file);
    }

    throw new HttpException(`Cannot find file ${name}`, HttpStatus.NOT_FOUND);
  }
}
