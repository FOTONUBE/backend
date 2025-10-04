import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsUrl,
} from 'class-validator';
import { UserRole } from 'src/user/dto/base-user.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
