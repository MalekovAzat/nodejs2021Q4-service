import { ColumnInterface } from '../columns/columns.interface';

export interface BoardInterface {
  columns: ColumnInterface[];
  id?: string;
  title: string;
}
