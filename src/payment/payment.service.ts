// src/payment/payment.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';

import { UserService } from 'src/user/user.service';
import { PaymentAccount } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentAccount)
    private paymentAccountRepo: Repository<PaymentAccount>,

    private readonly userService: UserService,
  ) {}

  /**
   * Intercambia el `code` de OAuth de MercadoPago por tokens
   */
  // src/payment/payment.service.ts
  async linkMercadoPago(userId: string, code: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const { data } = await axios.post(
      'https://api.mercadopago.com/oauth/token',
      {
        client_secret: process.env.MP_CLIENT_SECRET,
        client_id: process.env.MP_CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.MP_REDIRECT_URI,
      },
    );

    console.log('Respuesta de MercadoPago en el callback:', data);

    // Guardar o actualizar cuenta de pago
    let account = await this.paymentAccountRepo.findOne({
      where: { user: { id: userId }, provider: 'mercadopago' },
      relations: ['user'],
    });

    if (!account) {
      account = this.paymentAccountRepo.create({
        user,
        provider: 'mercadopago',
      });
    }

    account.accessToken = data.access_token;
    account.refreshToken = data.refresh_token;
    account.providerUserId = data.user_id;
    account.tokenExpiresAt = new Date(Date.now() + data.expires_in * 1000);

    return this.paymentAccountRepo.save(account);
  }

  /**
   * Refresca el token si está vencido
   */
  async refreshToken(account: PaymentAccount) {
    if (!account.refreshToken) return account;

    const { data } = await axios.post(
      'https://api.mercadopago.com/oauth/token',
      {
        client_secret: process.env.MP_CLIENT_SECRET,
        client_id: process.env.MP_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: account.refreshToken,
      },
    );

    account.accessToken = data.access_token;
    account.refreshToken = data.refresh_token;
    account.tokenExpiresAt = new Date(Date.now() + data.expires_in * 1000);

    return this.paymentAccountRepo.save(account);
  }

  /**
   * Obtiene el token válido para un usuario
   */
  async getAccessToken(userId: string): Promise<string> {
    const account = await this.paymentAccountRepo.findOne({
      where: { user: { id: userId }, provider: 'mercadopago' },
    });
    if (!account)
      throw new UnauthorizedException('Cuenta de pago no vinculada');

    if (account.tokenExpiresAt && account.tokenExpiresAt < new Date()) {
      const updated = await this.refreshToken(account);
      return updated.accessToken;
    }

    return account.accessToken;
  }

  async getAccount(userId: string): Promise<PaymentAccount> {
    const account = await this.paymentAccountRepo.findOne({
      where: { user: { id: userId }, provider: 'mercadopago' },
      relations: ['user'],
    });
    if (!account)
      throw new NotFoundException('Cuenta de MercadoPago no encontrada');

    // refrescar token si está vencido
    if (account.tokenExpiresAt && account.tokenExpiresAt < new Date()) {
      return this.refreshToken(account);
    }

    return account;
  }
}
