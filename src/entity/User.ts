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

  @Column({ length: 20 })
  login!: string;

  @Column({ length: 20 })
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      login: this.login,
    };
  }
}
