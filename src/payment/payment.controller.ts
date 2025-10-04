// src/payment/payment.controller.ts
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Get('mercadopago/callback')
  async mercadopagoCallback(@Query('code') code: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.paymentService.linkMercadoPago(userId, code);
  }
}
