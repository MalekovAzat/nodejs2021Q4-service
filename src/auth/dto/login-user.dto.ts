import { IsNotEmpty } from 'class-validator';

export class LoginUsedDto {
  @IsNotEmpty()
    login: string;

  @IsNotEmpty()
    password: string;
}
