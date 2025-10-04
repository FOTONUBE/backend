import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsUrl,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
