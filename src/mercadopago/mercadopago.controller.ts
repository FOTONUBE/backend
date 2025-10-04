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
    // ⚡ req.body es un Buffer puro
    const rawBody = req.body.toString('utf-8');
    const parsedBody = JSON.parse(rawBody);

    res.status(200).send('OK');

    await this.mercadopagoService.processNotification(
      rawBody,
      parsedBody,
      signature,
      requestId,
    );
  }
}
