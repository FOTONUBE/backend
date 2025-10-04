import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';
import { AdminUserService } from './admin.service';
import { AdminUserController } from './admin.controller';
import { Order } from 'src/order/entities/order.entity';
import { AdminOrderController } from './adminOrder.controller';
import { AdminOrderService } from './adminOrder.service';
import { Album } from 'src/album/entities/album.entity';
import { AdminAlbumService } from './adminAlbum.service';
import { AdminAlbumController } from './adminAlbum.controller';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Album])],
  controllers: [
    AdminUserController,
    AdminOrderController,
    AdminAlbumController,
  ],
  providers: [AdminUserService, AdminOrderService, AdminAlbumService],
})
export class AdminModule {}
