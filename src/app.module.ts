import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { FilesModule } from './files/files.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    ColumnsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.getDbConfig(),
      inject: [ConfigService],
    }),
    BoardsModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
