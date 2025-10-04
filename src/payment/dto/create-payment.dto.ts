// src/payment/dto/create-payment-account.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentAccountDto {
  @IsEnum(['mercadopago'])
  provider: 'mercadopago';

  @IsNotEmpty()
  accessToken: string;

  @IsOptional()
  refreshToken?: string;

  @IsOptional()
  tokenExpiresAt?: Date;

  @IsOptional()
  providerUserId?: number;
}
