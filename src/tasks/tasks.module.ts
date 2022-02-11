import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsModule } from '../boards/boards.module';
import { ColumnsModule } from '../columns/columns.module';
import { Task } from '../entity/Task';
import { UsersModule } from '../users/users.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    BoardsModule,
    ColumnsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
