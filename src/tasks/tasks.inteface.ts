import { Task } from '../entity/Task';

export interface TaskInterface {
  boardId?: string;
  columnId?: string;
  description: string;
  id?: string;
  order: number;
  title: string;
  userId?: string;
}

export type ITask = Pick<
Task,
'id' | 'title' | 'order' | 'description' | 'userId' | 'boardId' | 'columnId'
>;
