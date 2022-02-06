import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  Body,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from '../entity/Task';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './tasks.inteface';
import { TasksService } from './tasks.service';

@Controller('/boards/:boardId/tasks/')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/')
  @HttpCode(200)
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.findById(id);
  }

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: false }))
  create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
      @Body() createTaskDto: CreateTaskDto,
  ): Promise<ITask> {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Put('/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: false }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
      @Param('boardId', ParseUUIDPipe) boardId: string,
      @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    return this.tasksService.update(boardId, { id, ...updateTaskDto });
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.tasksService.delete(id);
  }
}
