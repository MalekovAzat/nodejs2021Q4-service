let tasksCollection = [];
const Task = require('./task.model');

const getAll = async () => tasksCollection;

const getById = async ({ id }) =>
  tasksCollection.find((task) => task.id === id);

const create = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
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
};

const update = async ({ id, ...props }) => {
  const foundedTask = tasksCollection.find((task) => task.id === id);
  if (foundedTask !== undefined) {
    foundedTask.update(props);
  } else {
    return foundedTask;
  }

  return foundedTask;
};

const deleteTask = async ({ id }) => {
  const taskIndex = tasksCollection.findIndex((user) => user.id === id);
  if (taskIndex === -1) {
    return false;
  }

  return Boolean(tasksCollection.splice(taskIndex, 1));
};

const deleteByBoardId = async ({ boardId }) => {
  tasksCollection = tasksCollection.filter((task) => task.boardId !== boardId);
};

const resetUserId = async ({ userId }) => {
  const tasksToResetUser = tasksCollection
    .map((val, index) => (val.userId === userId ? index : -1))
    .filter((index) => index !== -1);

  tasksToResetUser.forEach((index) => {
    tasksCollection[index].userId = null;
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteTask,
  deleteByBoardId,
  resetUserId,
};
