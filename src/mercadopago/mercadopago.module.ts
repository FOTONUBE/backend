// mercadopago.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // 1. Import HttpModule
import { MercadopagoService } from './mercadopago.service';
import { OrdersModule } from 'src/order/order.module';
import { ConfigModule } from '@nestjs/config';
import { MercadopagoController } from './mercadopago.controller';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  imports: [HttpModule, OrdersModule, SubscriptionModule, ConfigModule],
  controllers: [MercadopagoController],
  providers: [MercadopagoService],
  exports: [MercadopagoService],
})
export class MercadopagoModule {}
