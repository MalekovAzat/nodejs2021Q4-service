import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import { ColumnsService } from '../columns/columns.service';
import { Task } from '../entity/Task';
import { UsersService } from '../users/users.service';
import { TaskInterface, ITask } from './tasks.inteface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private usersService: UsersService,
    private boardsService: BoardsService,
    private columnsService: ColumnsService,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ id });
    if (task === undefined) {
      throw new HttpException(
        `Cannot find task by id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return task;
  }

  async create(
    board,
    {
      title, order, description, userId, boardId, columnId,
    }: TaskInterface,
  ): Promise<ITask> {
    const task = new Task();

    task.title = title;
    task.order = order;
    task.description = description;

    task.user = await this.usersService.findFullById(userId);
    task.board = await this.boardsService.findById(board);
    task.column = await this.columnsService.findById(columnId);

    await this.tasksRepository.save(task);

    return task.toResponse();
  }

  async update(
    board,
    {
      id, title, order, description, userId, boardId, columnId,
    }: TaskInterface,
  ): Promise<ITask> {
    const task = await this.tasksRepository.findOne({ id });

    task.title = title;
    task.order = order;
    task.description = description;

    task.user = await this.usersService.findFullById(userId);
    task.board = await this.boardsService.findById(board);
    task.column = await this.columnsService.findById(columnId);

    await this.tasksRepository.save(task);
    return task.toResponse();
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.tasksRepository.delete(id);
    if (deleteResult.affected < 1) {
      throw new HttpException(
        `Cannot delete task with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
}
