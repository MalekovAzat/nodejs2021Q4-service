import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from '../entity/Column';
import { ColumnsService } from './columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
