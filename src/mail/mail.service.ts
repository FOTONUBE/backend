import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

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
  private readonly transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // c1320274.ferozo.com
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER, // desarrollo@fotonube.com
        pass: process.env.SMTP_PASS, // dEmo25*Nube
      },
      tls: { rejectUnauthorized: false },
    });
  }

  private async sendMail(to: string, subject: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"FotoNube" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      });
      this.logger.log(`✅ Email enviado a ${to}: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`❌ Error al enviar correo a ${to}`, error);
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
