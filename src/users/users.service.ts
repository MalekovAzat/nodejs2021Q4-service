import {
  Injectable,
  OnApplicationBootstrap,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { User } from '../entity/User';

import { UserWithoutPassword } from './users.interfaces';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ select: ['id', 'name', 'login'] });
  }

  async findById(id: string): Promise<UserWithoutPassword> {
    const user = await this.usersRepository.findOne({ id });

    if (user === undefined) {
      throw new HttpException(
        `Cannot find task by id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user.toResponse();
  }

  findFullById(id: string): Promise<User> {
    return this.usersRepository.findOne({ id });
  }

  findByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({ login });
  }

  async create({
    name,
    login,
    password,
  }: {
    login: string;
    name: string;
    password: string;
  }): Promise<UserWithoutPassword> {
    const user = new User();

    user.name = name;
    user.login = login;
    user.password = await hash(password, 10);

    await this.usersRepository.save(user);
    return user.toResponse();
  }

  async update({
    id,
    name,
    login,
    password,
  }: {
    id: string;
    login: string;
    name: string;
    password: string;
  }): Promise<UserWithoutPassword> {
    const user = await this.usersRepository.findOne({ id });

    user.name = name;
    user.login = login;
    user.password = await hash(password, 10);

    await this.usersRepository.save(user);

    return user.toResponse();
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.usersRepository.delete(id);

    if (deleteResult.affected < 1) {
      throw new HttpException(
        `Cannot delete user with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }

  async onApplicationBootstrap() {
    const devMode = this.configService.get('NODE_ENV') === 'development';

    if (!devMode) {
      return;
    }

    let user = await this.usersRepository.findOne({ login: 'admin' });
    if (user !== undefined) {
      return;
    }

    user = new User();

    user.login = 'admin';
    user.password = await hash('admin', 10);
    user.name = 'admin';
    await this.usersRepository.save(user);
  }
}
