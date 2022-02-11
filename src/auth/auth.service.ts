import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createJwt({ login, password }: { login: string; password: string }) {
    const user = await this.validateUser({ login, password });

    return this.signSwt({ id: user.id, login: user.login });
  }

  async validateUser({ login, password }: { login: string; password: string }) {
    const user = await this.usersService.findByLogin(login);

    if (user === undefined) {
      throw new HttpException(
        `Login ${login} is not found`,
        HttpStatus.FORBIDDEN,
      );
    }
    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) {
      throw new HttpException(
        `Incorrect password for ${login}`,
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }

  async signSwt(user: { id: string; login: string }) {
    const payload = {
      id: user.id,
      login: user.login,
      iat: Math.floor(Date.now() / 1000) - 30,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
