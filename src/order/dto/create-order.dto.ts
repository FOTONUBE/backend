// create-order.dto.ts
import {
  IsUUID,
  IsArray,
  ValidateNested,
  IsInt,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsUUID()
  photoId: string;

  @IsString()
  size: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  unitPrice: number;
}

export class CreateOrderDto {
  @IsUUID()
  albumId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
