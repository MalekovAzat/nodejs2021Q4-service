import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { ColumnEntity } from './Column';
import { Task } from './Task';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns!: ColumnEntity[];

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}
