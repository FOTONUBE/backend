// create-photo.dto.ts
import { IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  url: string;

  @IsUUID()
  albumId: string;
}
