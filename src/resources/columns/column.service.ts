import { getRepository } from '../../common/postgresProvider';
import { ColumnEntity } from '../../entity/Column';
import { ColumnInterface } from './column.interfaces';

/**
 * The function adds columns to the repository
 */
export async function createEntities(columns: ColumnInterface[]) {
  const columnRepo = getRepository(ColumnEntity);

  const entites = columns.map(({ title, order }) => {
    const columnEntity = new ColumnEntity();

    columnEntity.title = title;
    columnEntity.order = order;

    return columnEntity;
  });

  await columnRepo.save(entites);
  return entites;
}

export async function updateEntities(columnsObjects: ColumnInterface[]) {
  const columnRepo = getRepository(ColumnEntity);
  const ids = columnsObjects.map(({ id }) => id);
  const founedColumns = await columnRepo.findByIds(ids);

  const updatedEntities = columnsObjects.map((columnObject) => {
    const entity = (founedColumns as ColumnEntity[]).find(
      ({ id }) => id === columnObject.id,
    );
    (entity as ColumnEntity).title = (columnObject as ColumnInterface).title;
    (entity as ColumnEntity).order = (columnObject as ColumnInterface).order;

    return entity;
  });

  columnRepo.save(updatedEntities);

  return founedColumns as ColumnEntity[];
}

/**
 * The function to request to db to find column by id
 * @param param0 - The object which contain column id
 * @returns The promise with founded ColumnEntity or empty object
 */
export async function findById({ id }: { id: string }) {
  const columnRepo = getRepository(ColumnEntity);
  const board = await columnRepo.findOne({ id });
  return board;
}
