import { Board, BoardId, BoardProperties } from './board.model';

const boardsCollection: Array<Board> = [];

/**
 * The function returns boards in response format
 * @returns The promise with array of the boards
 */
async function getAll() {
  return boardsCollection;
}

/**
 * The function returns founded by id board if exist othervice returns empty object
 * @param param0 - The object which contain board id
 * @returns The promise with founded board or empty object
 */
async function getById({ id }: BoardId) {
  return boardsCollection.find((board) => board.id === id);
}

/**
 * The function creates board and returns board response data
 * @param param0 - The board data
 * @returns The promise with created board data in the response format
 */
async function create({ title, columns }: BoardProperties) {
  const board = new Board({ title, columns });

  boardsCollection.push(board);

  return board;
}

/**
 * The function updates board data by board id
 * @param param0 - The object which contains board id and properties
 * @returns The promise with updated board in the respose format
 */
async function update({ id, props }: { id: string; props: BoardProperties }) {
  const foundedBoard = boardsCollection.find((board) => board.id === id);

  if (foundedBoard !== undefined) {
    foundedBoard.update(props);
  }

  return foundedBoard;
}

/**
 * The function delete board by id
 * @param param0 - The object which contains board id
 * @returns The promise with true if the board deleted false otherwise
 */
async function deleteBoard({ id }: BoardId) {
  const boardIndex = boardsCollection.findIndex((board) => board.id === id);
  if (boardIndex === -1) {
    return false;
  }

  return Boolean(boardsCollection.splice(boardIndex, 1));
}

export {
  getAll, getById, create, update, deleteBoard,
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteBoard,
};
