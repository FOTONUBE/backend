import { Injectable, Logger } from '@nestjs/common';
import { generatePasswordResetEmail } from 'lib/emailForgotPassword';
import { generateNewOrderNotificationEmail } from 'lib/emailNewOrderNotification';
import { generatePurchaseConfirmationEmail } from 'lib/emailOrderPayment';
import { generateProWelcomeEmail } from 'lib/emailProWelcome';
import {
  generateBuyerWelcomeEmail,
  generatePhotographerWelcomeEmail,
} from 'lib/emailWelcome';

import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendWelcomeEmail(to: string, role: string) {
    let htmlContent;

    // Se determina qué template usar según el rol
    if (role === 'photographer') {
      htmlContent = generatePhotographerWelcomeEmail();
    } else if (role === 'buyer') {
      htmlContent = generateBuyerWelcomeEmail();
    } else {
      // Manejar un caso por defecto o lanzar un error
      this.logger.warn(
        `Rol desconocido: ${role}. No se enviará email de bienvenida.`,
      );
      return;
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: 'FotoNube <onboarding@resend.dev>',
        to,
        subject: '¡Bienvenido a FotoNube!',
        html: htmlContent,
      });

      if (error) {
        this.logger.error(`Error al enviar email a ${to}`, error);
      } else {
        this.logger.log(`Email de bienvenida enviado a ${to} (Rol: ${role})`);
      }
    } catch (err) {
      this.logger.error('Error al enviar correo', err);
    }
  }

  async sendPasswordResetEmail(to: string, resetLink: string) {
    const htmlContent = generatePasswordResetEmail({ resetLink });

    try {
      const { data, error } = await this.resend.emails.send({
        from: 'FotoNube <onboarding@resend.dev>',
        to,
        subject: 'Recupera tu contraseña en FotoNube',
        html: htmlContent,
      });

      if (error) {
        this.logger.error(
          `Error al enviar email de recuperación a ${to}`,
          error,
        );
      } else {
        this.logger.log(`Email de recuperación enviado a ${to}`);
      }
    } catch (err) {
      this.logger.error('Error al enviar correo de recuperación', err);
    }
  }

  async sendProWelcomeEmail(to: string, name?: string) {
    // Generamos el contenido HTML usando el template de Pro
    const htmlContent = generateProWelcomeEmail({ name });

    try {
      const { data, error } = await this.resend.emails.send({
        from: 'FotoNube <onboarding@resend.dev>',
        to,
        subject: '¡Bienvenido a FotoNube Pro!',
        html: htmlContent,
      });

      if (error) {
        this.logger.error(
          `Error al enviar email de bienvenida Pro a ${to}`,
          error,
        );
      } else {
        this.logger.log(`Email de bienvenida Pro enviado a ${to}`);
      }
    } catch (err) {
      this.logger.error('Error al enviar correo de bienvenida Pro', err);
    }
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

    try {
      const { data, error } = await this.resend.emails.send({
        from: 'FotoNube <onboarding@resend.dev>',
        to,
        subject: 'Confirmación de tu compra en FotoNube',
        html: htmlContent,
      });

      if (error) {
        this.logger.error(`Error al enviar email de orden a ${to}`, error);
      } else {
        this.logger.log(`Email de confirmación de orden enviado a ${to}`);
      }
    } catch (err) {
      this.logger.error('Error al enviar correo de confirmación de orden', err);
    }
  }

  // 📩 Email para el fotógrafo al recibir un nuevo pedido
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

    try {
      await this.resend.emails.send({
        from: 'FotoNube <onboarding@resend.dev>',
        to: photographerEmail,
        subject: '¡Nuevo pedido recibido en FotoNube!',
        html: htmlContent,
      });

      this.logger.log(`Email de nuevo pedido enviado a ${photographerEmail}`);
    } catch (err) {
      this.logger.error('Error al enviar correo de nuevo pedido', err);
    }
  }
}
