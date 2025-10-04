import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PhotographerOrdersService } from './photographer-orders.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdateDeliveryStatusDto } from './dto/up-delivered-order.dto';

@Controller('photographer/orders')
export class PhotographerOrdersController {
  constructor(private readonly service: PhotographerOrdersService) {}

  @UseGuards(AuthGuard)
  @Get('my-orders')
  async getOrders(@Req() req) {
    const photographerId = req.user.sub;

    return this.service.getOrdersForPhotographer(photographerId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOrderById(@Req() req, @Param('id') id: string) {
    const photographerId = req.user.sub;

    return this.service.getOrderById(photographerId, id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/delivery-status')
  async updateDeliveryStatus(
    @Req() req,
    @Param('id') id: string,
    @Body() body: UpdateDeliveryStatusDto,
  ) {
    const photographerId = req.user.sub;
    return this.service.updateDeliveryStatus(
      photographerId,
      id,
      body.deliveryStatus,
    );
  }
}
