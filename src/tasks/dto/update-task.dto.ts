import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
    title: string;

  @IsNotEmpty()
    order: number;

  @IsNotEmpty()
    description: string;
  // @IsNotEmpty()
  // userId: string;
  // @IsNotEmpty()
  // boardId: string;
  // @IsNotEmpty()
  // columnId: string;
}
