import { v4 as uuidv4 } from 'uuid';

export interface TaskProperties {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

export interface TaskId {
  id: string;
}

export type TaskInterface = TaskId & TaskProperties;

class Task implements TaskInterface {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  /**
   * Constructor for class Task
   * @param param0 - The task data
   */
  constructor({
    id = uuidv4(),
    title = '',
    order = 0,
    description = '',
    userId = null,
    boardId = '',
    columnId = '',
  }: {
    id?: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string;
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * The function updates properties for task
   * @param properties - the properties to update
   */
  update(properties: TaskProperties) {
    Object.entries(properties).forEach(([name, value]) => {
      if (
        [
          'title',
          'order',
          'description',
          'userId',
          'boardId',
          'columnId',
        ].indexOf(name) >= 0
        && value !== undefined
      ) {
        Object.assign(this, { [name]: value });
      }
    });
  }
}

export { Task };
export default { Task };
