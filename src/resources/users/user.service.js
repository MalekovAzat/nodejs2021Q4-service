const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const create = ({ name, login, password }) =>
  usersRepo.create({ name, login, password });

const getById = ({ id }) => usersRepo.getById({ id });

const update = ({ id, name, login, password }) =>
  usersRepo.update({ id, name, login, password });

const deleteUser = ({ id }) => {
  taskRepo.resetUserId({ userId: id });
  return usersRepo.deleteUser({ id });
};

module.exports = { getAll, getById, create, update, deleteUser };
