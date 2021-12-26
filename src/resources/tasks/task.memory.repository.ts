import { Task, TaskId, TaskProperties } from './task.model';

let tasksCollection: Array<Task> = [];

/**
 * The function returns tasks in resonse format
 * @returns The promise with array of the tasks
 */
async function getAll() {
  return tasksCollection;
}

/**
 * The function returns founded by id task if exist othervice returns empty object
 * @param param0 - The object which contain task id
 * @returns The promise with founded task or empty object
 */
async function getById({ id }: TaskId) {
  return tasksCollection.find((task) => task.id === id);
}

/**
 * The function creates task and returns created task
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
}: TaskProperties) {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  tasksCollection.push(task);

  return task;
}

/**
 * The function updates task data by task id
 * @param param0 - The object which contains task id and properties
 * @returns The promise with updated task in the respose format
 */
async function update({
  id,
  props,
}: {
  id: string;
  props: TaskProperties;
}): Promise<Task | undefined> {
  const foundedTask = tasksCollection.find((task) => task.id === id);
  if (foundedTask !== undefined) {
    foundedTask.update(props);
  } else {
    return foundedTask;
  }

  return foundedTask;
}

/**
 * The function delete task by id
 * @param param0 - The object which contains task id
 * @returns The promise with true if the task deleted false otherwise
 */
async function deleteTask({ id }: TaskId) {
  const taskIndex = tasksCollection.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return false;
  }

  return Boolean(tasksCollection.splice(taskIndex, 1));
}
/**
 * The function delete task by provided boardId
 * @param param0 - The object which contain boardId
 */
async function deleteByBoardId({ boardId }: { boardId: string }) {
  tasksCollection = tasksCollection.filter((task) => task.boardId !== boardId);
}

/**
 * The function resets usersId for the task where userId is equal to providede userId
 * @param param0 - Object which contain userId
 */
async function resetUserId({ userId }: { userId: string }) {
  const tasksToResetUser = tasksCollection
    .map((val, index) => (val.userId === userId ? index : -1))
    .filter((index) => index !== -1);

  tasksToResetUser.forEach((index) => {
    tasksCollection[index].userId = null;
  });
}

export {
  getAll,
  getById,
  create,
  update,
  deleteTask,
  deleteByBoardId,
  resetUserId,
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteTask,
  deleteByBoardId,
  resetUserId,
};
