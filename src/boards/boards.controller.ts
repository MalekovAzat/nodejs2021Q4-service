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
import { Board } from '../entity/Board';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private boardsServise: BoardsService) {}

  @Get('/')
  @HttpCode(200)
  findAll(): Promise<Board[]> {
    return this.boardsServise.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Board> {
    return this.boardsServise.findById(id);
  }

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: false }))
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsServise.create(createBoardDto);
  }

  @Put('/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: false }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
      @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsServise.update({ id, ...updateBoardDto });
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.boardsServise.delete(id);
  }
}
