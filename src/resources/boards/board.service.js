const boardsRepo = require('./board.memory.repository');

const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = ({ id }) => boardsRepo.getById({ id });

const create = ({ title, columns }) => boardsRepo.create({ title, columns });

const update = ({ id, title, columns }) =>
  boardsRepo.update({ id, title, columns });

const deleteBoard = async ({ id }) => {
  taskRepo.deleteByBoardId({ boardId: id });
  return boardsRepo.deleteBoard({ id });
};

module.exports = { getAll, getById, create, update, deleteBoard };
