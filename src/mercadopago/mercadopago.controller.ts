import { Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-signature') signature: string,
    @Headers('x-request-id') requestId: string,
  ) {
    try {
      // Si no hay body o viene vacío, MercadoPago solo está validando la URL
      if (!req.body || (Buffer.isBuffer(req.body) && req.body.length === 0)) {
        console.log('📡 MercadoPago hizo una verificación del webhook (ping)');
        return res.status(200).send('Webhook verificado correctamente');
      }

      // Si viene con contenido, procesamos normalmente
      const rawBody = req.body.toString('utf-8');
      const parsedBody = JSON.parse(rawBody);

      res.status(200).send('OK');

      await this.mercadopagoService.processNotification(
        rawBody,
        parsedBody,
        signature,
        requestId,
      );
    } catch (error) {
      console.error('Error en webhook MercadoPago:', error);
      res.status(200).send('OK'); // Evitar reintentos infinitos
    }
  }
}
