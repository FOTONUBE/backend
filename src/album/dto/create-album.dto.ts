import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum PrintSize {
  SMALL = 'S',
  MEDIUM = 'M',
  LARGE = 'L',
}

class PriceOptionDto {
  @IsNotEmpty()
  @IsEnum(PrintSize)
  size: PrintSize;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;
}

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  userEvent: string;

  @IsNotEmpty()
  @IsString()
  passwordEvent: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceOptionDto)
  prices: PriceOptionDto[];

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  priceDigital: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceSchoolSports?: number;

  @IsNotEmpty()
  @IsDateString()
  eventDate: string;

  @IsNotEmpty()
  @IsEmail()
  clientEmail: string;

  @IsNotEmpty()
  @IsString()
  clientPhoneNumber: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsBoolean()
  isActiveFolder: boolean;
}
