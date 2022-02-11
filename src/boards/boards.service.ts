import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColumnsService } from '../columns/columns.service';
import { Board } from '../entity/Board';

import { BoardInterface } from './boards.interface';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
    private columnsService: ColumnsService,
  ) {}

  async findAll(): Promise<Board[]> {
    const boards = await this.boardsRepository.find({ relations: ['columns'] });

    boards.map((board) => {
      (board).columns.sort(({ order: order1 }, { order: order2 }) => {
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

    return boards;
  }

  async findById(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne(
      { id },
      { relations: ['columns'] },
    );

    if (board === undefined) {
      throw new HttpException(
        `Cannot find board by id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (board !== undefined) {
      (board).columns.sort(({ order: order1 }, { order: order2 }) => {
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

  async create({ title, columns }: BoardInterface): Promise<Board> {
    const board = new Board();

    board.title = title;
    board.columns = await this.columnsService.createBoardsColumns(columns);

    await this.boardsRepository.save(board);
    return board;
  }

  async update({ id, title, columns }: BoardInterface): Promise<Board> {
    const board = await this.boardsRepository.findOne({ id });

    board.title = title;
    board.columns = await this.columnsService.updateBoarsColumns(columns);

    await this.boardsRepository.save(board);

    return board;
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.boardsRepository.delete(id);
    if (deleteResult.affected < 1) {
      throw new HttpException(
        `Cannot delete board with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
}
