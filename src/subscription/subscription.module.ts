import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';
import { SubscriptionOrder } from './entities/subscription-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subscription,
      SubscriptionPlan,
      SubscriptionOrder,
    ]),
    UserModule,
    MailModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
