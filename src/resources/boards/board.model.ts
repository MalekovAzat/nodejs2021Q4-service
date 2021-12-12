import { v4 as uuidv4 } from 'uuid';

interface Column {
  id: string;
  title: string;
  order: number;
}

export interface BoardProperties {
  title: string;
  columns: Array<Column>;
}

export interface BoardId {
  id: string;
}

export type BoardInterface = BoardProperties & BoardId;

class Board implements BoardInterface {
  id: string;

  title: string;

  columns: Array<Column>;
  /**
   * Constructor for class Board
   * @param param0 The board data
   * @param param0.id The id of a board
   * @param param0.title The title of a board
   * @param param0.columns The list of the columns of a board
   */
  constructor({
    id = uuidv4(),
    title = 'Title',
    columns = [],
  }: {
    id?: string;
    title: string;
    columns: Array<Column>;
  }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
  /**
   * The function update Board properties like name, login, password
   * @param properties Theobject with board properties
   */
  update(properties: BoardProperties) {
    Object.entries(properties).forEach(([name, value]) => {
      if (['title', 'columns'].indexOf(name) >= 0 && value !== undefined) {
        Object.assign(this, { [name]: value });
      }
    });
  }
}

export { Board };
