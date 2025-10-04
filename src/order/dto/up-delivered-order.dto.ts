import { IsEnum } from 'class-validator';
import { DeliveryStatus } from '../entities/order.entity';

export class UpdateDeliveryStatusDto {
  @IsEnum(['pending', 'in_progress', 'delivered'])
  deliveryStatus: DeliveryStatus;
}
