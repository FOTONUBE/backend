import { IsEmail } from 'class-validator';

export class CreateLeadDto {
  @IsEmail()
  email: string;
}
