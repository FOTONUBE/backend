// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

import { UserModule } from 'src/user/user.module';
import { PaymentAccount } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentAccount]), UserModule],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
