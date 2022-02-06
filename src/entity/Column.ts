import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Board } from './Board';
import { Task } from './Task';

@Entity()
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ length: 100 })
    title!: string;

  @Column()
    order!: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
    board!: Board;

  @OneToMany(() => Task, (task) => task.column)
    tasks!: Task[];
}
