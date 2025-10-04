import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlan } from 'src/subscription/entities/subscriptionPlan.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([SubscriptionPlan])],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
