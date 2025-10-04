import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

import { FilesModule } from './files/files.module';
import { LeadModule } from './lead/lead.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { OrdersModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { PhotoModule } from './photo/photo.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AdminModule } from './admin/admin.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '1d',
        // expiresIn: '60s', // o '1m'
      },
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    AuthModule,
    MailModule,
    AlbumModule,
    OrdersModule,
    FilesModule,
    PhotoModule,
    SubscriptionModule,
    PaymentModule,
    MercadopagoModule,
    LeadModule,
    AdminModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
