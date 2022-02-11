import { IsNotEmpty } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
    title: string;

  @IsNotEmpty()
    order: number;
}
