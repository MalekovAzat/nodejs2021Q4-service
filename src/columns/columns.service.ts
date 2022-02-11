import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../entity/Column';
import { ColumnInterface } from './columns.interface';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
  ) {}

  findById(id) {
    return this.columnsRepository.findOne({ id });
  }

  async createBoardsColumns(columns: ColumnInterface[]) {
    const entities = columns.map(({ title, order }) => {
      const columnEntity = new ColumnEntity();

      columnEntity.title = title;
      columnEntity.order = order;

      return columnEntity;
    });

    await this.columnsRepository.save(entities);
    return entities;
  }

  async updateBoarsColumns(columns: ColumnInterface[]) {
    const ids = columns.map(({ id }) => id);
    const founedColumns = await this.columnsRepository.findByIds(ids);

    const updatedEntities = columns.map((columnObject) => {
      const entity = (founedColumns).find(
        ({ id }) => id === columnObject.id,
      );
      (entity).title = (columnObject).title;
      (entity).order = (columnObject).order;

      return entity;
    });

    this.columnsRepository.save(updatedEntities);

    return updatedEntities;
  }
}
