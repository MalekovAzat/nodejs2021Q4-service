import { BoardId, BoardProperties } from './board.model';

import boardsRepo from './board.memory.repository';

import taskRepo from '../tasks/task.memory.repository';

/**
 * The function to request to db to get all boards
 * @returns The promise with array of the boards
 */
function getAll() {
  return boardsRepo.getAll();
}

/**
 * The function to request to db to find board by id
 * @param param0 The object which contain board id
 * @param param0.id The id of the board
 * @returns The promise with founded board or empty object
 */
function getById({ id }: BoardId) {
  return boardsRepo.getById({ id });
}

/**
 * The function to request to db to create board
 * @param param0 The board data
 * @param param0.title The title of the board
 * @param param0.columns The columns of the board
 * @returns The promise with created board data in the response format
 */
function create({ title, columns }: BoardProperties) {
  return boardsRepo.create({ title, columns });
}

/**
 * The function to request to db to update the board
 * @param param0 The object which contains board id and properties
 * @param param0.id The id of the board to update
 * @param param0.title The title of the board
 * @param param0.columns The columns of the board
 * @returns The promise with updated board in the respose format
 */
function update({ id, title, columns }: BoardProperties & BoardId) {
  return boardsRepo.update({
    id,
    props: {
      title,
      columns,
    },
  });
}

/**
 * The function to request to db to delete board
 * @param param0 The object which contains board id
 * @param param0.id The if of the board to be deleted
 * @returns The promise with true if the board deleted false otherwise
 */
function deleteBoard({ id }: BoardId) {
  taskRepo.deleteByBoardId({ boardId: id });
  return boardsRepo.deleteBoard({ id });
}

export { getAll, getById, create, update, deleteBoard };
export default {
  getAll,
  getById,
  create,
  update,
  deleteBoard,
};
