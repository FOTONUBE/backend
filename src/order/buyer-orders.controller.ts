import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { BuyerOrdersService } from './buyer-orders.service';

@Controller('buyer/orders')
export class BuyerOrdersController {
  constructor(private readonly orderService: BuyerOrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  createOrder(@Body() dto: CreateOrderDto, @Req() req) {
    const buyerId = req.user.sub;

    return this.orderService.createOrder(dto, buyerId);
  }

  // 🔒 Obtener TODAS las órdenes del comprador autenticado
  @UseGuards(AuthGuard)
  @Get('')
  async getMyOrders(@Req() req) {
    const buyerId = req.user.sub; // viene del JWT
    return this.orderService.getOrdersByBuyer(buyerId);
  }

  // 🔒 Obtener UNA orden específica del comprador autenticado
  @UseGuards(AuthGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: string, @Req() req) {
    const buyerId = req.user.sub;
    return this.orderService.getOrderById(id, buyerId);
  }

  // 🔒 Eliminar una orden pendiente
  @UseGuards(AuthGuard)
  @Delete(':id')
  async cancelOrder(@Param('id') id: string, @Req() req) {
    const buyerId = req.user.sub;
    return this.orderService.cancelOrder(id, buyerId);
  }

  /*  */

  // @UseGuards(AuthGuard)
  @Post(':id/pay')
  async createPayment(@Param('id') orderId: string) {
    /*     const buyerId = req.user.sub;

    // Validamos que el comprador sea el dueño de la orden
    const order = await this.orderService.getOrderById(orderId, buyerId); */

    // Creamos la preferencia de pago
    return this.orderService.createPaymentPreference(orderId);
  }
}
