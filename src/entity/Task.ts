import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Board } from './Board';
import { ColumnEntity } from './Column';
import { User } from './User';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ length: 100 })
    title!: string;

  @Column()
    order!: number;

  @Column({ length: 20 })
    description!: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
    user!: User;

  @Column({ nullable: true })
    userId!: string;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
    board!: Board;

  @Column({ nullable: false })
    boardId!: string;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'columnId' })
    column!: ColumnEntity;

  @Column({ nullable: true })
    columnId!: string;

  toResponse() {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId ? this.userId : null,
      boardId: this.boardId ? this.boardId : null,
      columnId: this.columnId ? this.columnId : null,
    };
  }
}
