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

  // save to repo and return updated values
  return founedColumns.map((column) => {
    const columnObject = columnsObjects.find(
      ({ id }) => id === (column as ColumnEntity).id
    );
    (column as ColumnEntity).title = (columnObject as ColumnInterface).title;
    (column as ColumnEntity).order = (columnObject as ColumnInterface).order;

    columnRepo.save(column as ColumnEntity);

    return column as ColumnEntity;
  });
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
