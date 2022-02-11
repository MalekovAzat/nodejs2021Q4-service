import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Task } from './Task';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ length: 100 })
    name!: string;

  @Column({ length: 40, unique: true })
    login!: string;

  @Column({ length: 100 })
    password!: string;

  @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[];

  toResponse(): { id: string; login: string, name: string; } {
    return {
      id: this.id,
      name: this.name,
      login: this.login,
    };
  }
}
