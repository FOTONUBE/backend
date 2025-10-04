import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum UserRole {
  BUYER = 'buyer',
  PHOTOGRAPHER = 'photographer',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export class BaseUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  storageUsedMb?: number;
}
