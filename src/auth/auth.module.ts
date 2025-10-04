import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { PasswordResetService } from './password-reset.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, PasswordResetToken, User]),
    UserModule,
    MailModule,
    SubscriptionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordResetService],
})
export class AuthModule {}
