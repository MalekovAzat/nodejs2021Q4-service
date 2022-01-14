import { TaskInterface } from './task.interfaces';

import { getRepository } from '../../common/postgresProvider';
import { Task } from '../../entity/Task';

import { findById as findUserById } from '../users/user.service';
import { findById as findBoardById } from '../boards/board.service';
import { findById as findColumnById } from '../columns/column.service';

import { User } from '../../entity/User';
import { Board } from '../../entity/Board';
import { ColumnEntity } from '../../entity/Column';

/**
 * The function to request to db to get all tasks
 * @returns The promise with array of the tasks
 */
async function getAll() {
  const taskRepo = getRepository(Task);
  const allTask = (await taskRepo.find()) as Task[];
  return allTask.map((task: Task) => {
    return task.toResponse() as TaskInterface;
  });
}

/**
 * The function to request to db to find task by id
 * @param param0 - The object which contain task id
 * @returns The promise with founded task or empty object
 */
async function getById({ id }: { id: string }) {
  const taskRepo = getRepository(Task);
  const task = await taskRepo.findOne({ id });

  return task;
}

/**
 * The function to request to db to create task
 * @param param0 - The task data
 * @returns The promise with created task data in the response format
 */
async function create({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: TaskInterface) {
  const task = new Task();
  task.title = title;
  task.order = order;
  task.description = description;

  task.user = (await findUserById({ id: userId })) as User;
  task.board = (await findBoardById({ id: boardId })) as Board;
  task.column = (await findColumnById({ id: columnId })) as ColumnEntity;

  const taskRepo = getRepository(Task);

  await taskRepo.save(task);

  return task.toResponse();
}

/**
 * The function to request to db to update the task
 * @param param0 - The task data
 * @returns The promise with updated task in the respose format
 */
async function update({
  id,
  title,
  order,
  description,
  userId, // assignee
  boardId,
  columnId,
}: TaskInterface) {
  const taskRepo = getRepository(Task);

  const task = (await taskRepo.findOne({ id })) as Task;

  task.title = title;
  task.order = order;
  task.description = description;

  task.user = (await findUserById({ id: userId })) as User;
  task.board = (await findBoardById({ id: boardId })) as Board;
  task.column = (await findColumnById({ id: columnId })) as ColumnEntity;

  await taskRepo.save(task);

  return task.toResponse();
}

/**
 * The function to request to db to delete task
 * @param param0 - The object which contains task id
 * @returns The promise with true if the task deleted false otherwise
 */
async function deleteTask({ id }: { id: string }) {
  const taskRepo = getRepository(Task);

  const deleteResult = await taskRepo.delete(id);
  return (deleteResult.affected as number) > 0;
}

export { getAll, getById, create, update, deleteTask };
export default {
  getAll,
  getById,
  create,
  update,
  deleteTask,
};
