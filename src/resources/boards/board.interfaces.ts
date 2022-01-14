import { ColumnInterface } from '../columns/column.interfaces';

export interface BoardInterface {
  id?: string;
  title: string;
  columns: ColumnInterface[];
}
