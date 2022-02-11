import { IsNotEmpty } from 'class-validator';

import { CreateColumnDto } from '../../columns/dto/create-column.dto';

export class CreateBoardDto {
  @IsNotEmpty()
    title: string;

  @IsNotEmpty()
    columns: CreateColumnDto[];
}
