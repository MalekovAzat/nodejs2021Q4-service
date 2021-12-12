const boardsCollection = [];
const Board = require('./board.model');

const getAll = async () => boardsCollection;

const getById = async ({ id }) =>
  boardsCollection.find((board) => board.id === id);

const create = async ({ title, columns }) => {
  const board = new Board({ title, columns });

  boardsCollection.push(board);

  return board;
};

const update = async ({ id, ...props }) => {
  const foundedBoard = boardsCollection.find((board) => board.id === id);

  if (foundedBoard !== undefined) {
    foundedBoard.update(props);
  } else {
    return foundedBoard;
  }

  return foundedBoard;
};

const deleteBoard = async ({ id }) => {
  const boardIndex = boardsCollection.findIndex((board) => board.id === id);
  if (boardIndex === -1) {
    return false;
  }

  return Boolean(boardsCollection.splice(boardIndex, 1));
};

module.exports = { getAll, getById, create, update, deleteBoard };
