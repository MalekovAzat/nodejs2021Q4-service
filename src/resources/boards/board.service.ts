import { BoardInterface } from './board.interfaces';

import { Board } from '../../entity/Board';
import { getRepository } from '../../common/postgresProvider';

import {
  createEntities as createColumnEntities,
  updateEntities as updateColumnEntities,
} from '../columns/column.service';
import { Task } from '../../entity/Task';
import { logger } from '../../logger/LoggerMiddleware';

/**
 * The function to request to db to get all boards
 * @returns The promise with array of the boards
 */
async function getAll() {
  const boardRepo = getRepository(Board);

  const allBoards = await boardRepo.find({ relations: ['columns'] });

  // sort columns by order for each boards
  allBoards.map((board) => {
    (board as Board).columns.sort(({ order: order1 }, { order: order2 }) => {
      if (order1 > order2) {
        return 1;
      }
      if (order1 < order2) {
        return -1;
      }
      return 0;
    });
    return board;
  });

  return allBoards;
}

/**
 * The function to request to db to find board by id
 * @param param0 - The object which contain board id
 * @returns The promise with founded board or empty object
 */
async function getById({ id }: { id: string }) {
  const boardRepo = getRepository(Board);

  const board = await boardRepo.findOne({ id }, { relations: ['columns'] });

  if (board !== undefined) {
    // sort columns by order for each boards
    (board as Board).columns.sort(({ order: order1 }, { order: order2 }) => {
      if (order1 > order2) {
        return 1;
      }
      if (order1 < order2) {
        return -1;
      }
      return 0;
    });
  }
  return board;
}

/**
 * The function to request to db to find board by id
 * @param param0 - The object which contain board id
 * @returns The promise with founded boardEntity or empty object
 */
async function findById({ id }: { id: string }) {
  const boardRepo = getRepository(Board);
  const board = await boardRepo.findOne({ id });

  return board;
}

/**
 * The function to request to db to create board
 * @param param0 - The board data
 * @returns The promise with created board data in the response format
 */
async function create({ title, columns }: BoardInterface) {
  const boardRepo = getRepository(Board);

  const board = new Board();
  board.title = title;
  board.columns = await createColumnEntities(columns);

  await boardRepo.save(board);
  return board;
}

/**
 * The function to request to db to update the board
 * @param param0 - The object which contains board id and properties
 * @returns The promise with updated board in the respose format
 */
async function update({ id, title, columns }: BoardInterface) {
  const boardRepo = getRepository(Board);

  const board = (await boardRepo.findOne({ id })) as Board;

  board.title = title;
  board.columns = await updateColumnEntities(columns);
  console.log(board);

  await boardRepo.save(board);
  console.log(board);
  return board;
}

/**
 * The function to request to db to delete board
 * @param param0 - The object which contains board id
 * @returns The promise with true if the board deleted false otherwise
 */
async function deleteBoard({ id }: { id: string }) {
  const boardRepo = getRepository(Board);
  const deleteBoardResult = await boardRepo.delete(id);

  return (deleteBoardResult.affected as number) > 0;
}

export {
  getAll, getById, findById, create, update, deleteBoard,
};
export default {
  getAll,
  getById,
  findById,
  create,
  update,
  deleteBoard,
};
