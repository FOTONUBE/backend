import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

import { generatePasswordResetEmail } from 'lib/emailForgotPassword';
import { generateNewOrderNotificationEmail } from 'lib/emailNewOrderNotification';
import { generatePurchaseConfirmationEmail } from 'lib/emailOrderPayment';
import { generateProWelcomeEmail } from 'lib/emailProWelcome';
import {
  generateBuyerWelcomeEmail,
  generatePhotographerWelcomeEmail,
} from 'lib/emailWelcome';

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  private async sendMail(to: string, subject: string, html: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: 'FotoNube <desarrollo@fotonube.com>',
        to,
        subject,
        html,
      });

      if (error) {
        this.logger.error(`❌ Error al enviar correo a ${to}`, error);
        return;
      }

      this.logger.log(`✅ Email enviado a ${to}: ${data?.id}`);
    } catch (err) {
      this.logger.error(`❌ Error inesperado al enviar correo a ${to}`, err);
    }
  }

  async sendWelcomeEmail(to: string, role: string) {
    let htmlContent;

    if (role === 'photographer')
      htmlContent = generatePhotographerWelcomeEmail();
    else if (role === 'buyer') htmlContent = generateBuyerWelcomeEmail();
    else {
      this.logger.warn(`Rol desconocido: ${role}`);
      return;
    }

    await this.sendMail(to, '¡Bienvenido a FotoNube!', htmlContent);
  }

  async sendPasswordResetEmail(to: string, resetLink: string) {
    const htmlContent = generatePasswordResetEmail({ resetLink });
    await this.sendMail(to, 'Recupera tu contraseña en FotoNube', htmlContent);
  }

  async sendProWelcomeEmail(to: string, name?: string) {
    const htmlContent = generateProWelcomeEmail({ name });
    await this.sendMail(to, '¡Bienvenido a FotoNube Pro!', htmlContent);
  }

  async sendOrderPaymentEmail(
    to: string,
    orderId: string,
    total: string,
    itemCount: number,
  ) {
    const htmlContent = generatePurchaseConfirmationEmail(
      orderId,
      total,
      itemCount,
    );
    await this.sendMail(
      to,
      'Confirmación de tu compra en FotoNube',
      htmlContent,
    );
  }

  async sendNewOrderNotification(
    photographerEmail: string,
    orderId: string,
    total: string,
    itemCount: number,
    buyerName: string,
  ) {
    const htmlContent = generateNewOrderNotificationEmail(
      orderId,
      total,
      itemCount,
      buyerName,
    );
    await this.sendMail(
      photographerEmail,
      '¡Nuevo pedido recibido en FotoNube!',
      htmlContent,
    );
  }
}
