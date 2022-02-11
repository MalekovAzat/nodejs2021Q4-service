import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
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
