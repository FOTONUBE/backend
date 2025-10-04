// src/subscription/dto/create-subscription-order.dto.ts
import { IsUUID } from 'class-validator';

export class CreateSubscriptionOrderDto {
  @IsUUID()
  planId: string;
}
