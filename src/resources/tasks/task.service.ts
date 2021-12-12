import { TaskId, TaskProperties } from './task.model';

import tasksRepo from './task.memory.repository';
/**
 * The function to request to db to get all tasks
 * @returns The promise with array of the tasks
 */
function getAll() {
  return tasksRepo.getAll();
}

/**
 * The function to request to db to find task by id
 * @param param0 The object which contain task id
 * @param param0.id The id of the task
 * @returns The promise with founded task or empty object
 */
function getById({ id }: TaskId) {
  return tasksRepo.getById({ id });
}

/**
 * The function to request to db to create task
 * @param param0 The task data
 * @param param0.id The id of a task
 * @param param0.order The order of a task
 * @param param0.description The description of a task
 * @param param0.userId The userId of a task
 * @param param0.boardId The boardId of a task
 * @param param0.columnId The columnId of a task
 * @returns The promise with created task data in the response format
 */
function create({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: TaskProperties) {
  return tasksRepo.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
}

/**
 * The function to request to db to update the task
 * @param param0 The task data
 * @param param0.id The id of a task
 * @param param0.order The order of a task
 * @param param0.description The description of a task
 * @param param0.userId The userId of a task
 * @param param0.boardId The boardId of a task
 * @param param0.columnId The columnId of a task
 * @returns The promise with updated task in the respose format
 */
function update({
  id,
  title,
  order,
  description,
  userId, // assignee
  boardId,
  columnId,
}: TaskId & TaskProperties) {
  return tasksRepo.update({
    id,
    props: {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    },
  });
}

/**
 * The function to request to db to delete task
 * @param param0 The object which contains task id
 * @param param0.id The if of the task to be deleted
 * @returns The promise with true if the task deleted false otherwise
 */
function deleteTask({ id }: TaskId) {
  return tasksRepo.deleteTask({ id });
}

export { getAll, getById, create, update, deleteTask };
export default {
  getAll,
  getById,
  create,
  update,
  deleteTask,
};
