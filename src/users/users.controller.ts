import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  Body,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import { UserWithoutPassword } from './users.interfaces';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @HttpCode(200)
  findAll(): Promise<UserWithoutPassword[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserWithoutPassword> {
    return this.usersService.findById(id);
  }

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: false }))
  create(@Body() createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    return this.usersService.create(createUserDto);
  }

  @Put('/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: false }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
      @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.usersService.update({ id, ...updateUserDto });
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
