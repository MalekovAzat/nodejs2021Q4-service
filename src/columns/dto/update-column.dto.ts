import { IsNotEmpty } from 'class-validator';

export class UpdateColumnDto {
  @IsNotEmpty()
    title: string;

  @IsNotEmpty()
    order: number;
}
