import {
  Body,
  Controller,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsedDto } from './dto/login-user.dto';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: false }))
  async login(@Body() loginUsedDto: LoginUsedDto) {
    const token = await this.authService.createJwt(loginUsedDto);
    return token;
  }
}
