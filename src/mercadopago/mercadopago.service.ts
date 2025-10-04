import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';
import { createHmac } from 'crypto';
import { firstValueFrom } from 'rxjs';
import { BuyerOrdersService } from 'src/order/buyer-orders.service';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class MercadopagoService {
  private secret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly buyerOrdersService: BuyerOrdersService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    const secret = this.configService.get<string>('MP_WEBHOOK_SECRET');
    if (!secret) throw new Error('MP_WEBHOOK_SECRET no configurada');
    this.secret = secret;
  }

  async processNotification(
    rawBody: string,
    parsedBody: any,
    signature: string,
    requestId: string,
  ) {
    /*    if (!this.isValidSignature(rawBody, signature, requestId)) {
      console.error('Firma inválida en webhook de Mercado Pago');
      return;
    } */

    const { type, data } = parsedBody;

    console.log('Webhook recibido:', parsedBody);

    if (type === 'payment') {
      try {
        const url = `https://api.mercadopago.com/v1/payments/${data.id}`;
        const { data: paymentData } = await firstValueFrom(
          this.httpService.get(url, {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>(
                'MP_MARKETPLACE_ACCESS_TOKEN',
              )}`,
            },
          }),
        );

        const registroId = paymentData.external_reference;
        if (!registroId) {
          console.warn('Pago sin external_reference:', paymentData);
          throw new BadRequestException('Pago sin external_reference');
        }

        await this.handlePaymentUpdate(paymentData);
      } catch (error) {
        console.error(
          'Error fetching payment details:',
          error.response?.data || error.message,
        );
        throw new InternalServerErrorException(
          'Failed to process payment notification',
        );
      }
    }
  }

  private isValidSignature(
    rawBody: string,
    signature: string,
    requestId: string,
  ): boolean {
    if (!signature) return false;

    // Extraer ts y v1
    const tsPart = signature.split(',').find((p) => p.startsWith('ts='));
    const v1Part = signature.split(',').find((p) => p.startsWith('v1='));
    const ts = tsPart?.substring(3);
    const v1 = v1Part?.substring(3);

    if (!ts || !v1) return false;

    // Construimos la plantilla oficial
    let template = '';
    const body = JSON.parse(rawBody);

    if (body?.data?.id)
      template += `id:${body.data.id.toString().toLowerCase()};`;
    if (requestId) template += `request-id:${requestId};`;
    template += `ts:${ts};`;

    const hmac = createHmac('sha256', this.secret)
      .update(template)
      .digest('hex');

    console.log('Firma recibida:', v1);
    console.log('Firma generada:', hmac);

    return hmac === v1;
  }

  private async handlePaymentUpdate(payment: any) {
    const { external_reference, status } = payment;

    if (!external_reference) return;

    if (external_reference.startsWith('buyerOrder-')) {
      const orderId = external_reference.replace('buyerOrder-', '');
      console.log(
        `Actualizando orden de compra ${orderId} con estado ${status}`,
      );
      if (status === 'approved') {
        await this.buyerOrdersService.updateOrderStatus(orderId, 'approved');
      } else if (status === 'rejected') {
        await this.buyerOrdersService.updateOrderStatus(orderId, 'rejected');
      }
    } else if (external_reference.startsWith('subscription-')) {
      const subscriptionId = external_reference.replace('subscription-', '');
      console.log(
        `Actualizando suscripción ${subscriptionId} con estado ${status}`,
      );
      if (status === 'approved') {
        await this.subscriptionService.updateSubscriptionOrderStatus(
          subscriptionId,
          'approved',
        );
      } else if (status === 'rejected') {
        await this.subscriptionService.updateSubscriptionOrderStatus(
          subscriptionId,
          'rejected',
        );
      }
    } else {
      console.warn('External_reference no reconocido:', external_reference);
    }
  }
}
