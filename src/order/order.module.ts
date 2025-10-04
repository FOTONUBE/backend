import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from 'src/user/entities/user.entity';
import { Album } from 'src/album/entities/album.entity';
import { Photo } from 'src/photo/entities/photo.entity';

import { BuyerOrdersController } from './buyer-orders.controller';
import { BuyerOrdersService } from './buyer-orders.service';
import { PhotographerOrdersController } from './photographer-orders.controller';
import { PhotographerOrdersService } from './photographer-orders.service';
import { PaymentModule } from 'src/payment/payment.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, User, Album, Photo]),
    PaymentModule,
    MailModule,
  ],
  controllers: [BuyerOrdersController, PhotographerOrdersController],
  providers: [BuyerOrdersService, PhotographerOrdersService],
  exports: [BuyerOrdersService],
})
export class OrdersModule {}
