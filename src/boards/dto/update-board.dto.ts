import { IsNotEmpty } from 'class-validator';

import { UpdateColumnDto } from '../../columns/dto/update-column.dto';

export class UpdateBoardDto {
  @IsNotEmpty()
    title: string;

  @IsNotEmpty()
    columns: UpdateColumnDto[];
}
