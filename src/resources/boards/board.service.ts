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
 * @param param0 - The object which contain board id
 * @returns The promise with founded board or empty object
 */
function getById({ id }: BoardId) {
  return boardsRepo.getById({ id });
}

/**
 * The function to request to db to create board
 * @param param0 - The board data
 * @returns The promise with created board data in the response format
 */
function create({ title, columns }: BoardProperties) {
  return boardsRepo.create({ title, columns });
}

/**
 * The function to request to db to update the board
 * @param param0 - The object which contains board id and properties
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
 * @param param0 - The object which contains board id
 * @returns The promise with true if the board deleted false otherwise
 */
function deleteBoard({ id }: BoardId) {
  taskRepo.deleteByBoardId({ boardId: id });
  return boardsRepo.deleteBoard({ id });
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
