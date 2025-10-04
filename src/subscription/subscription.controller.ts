import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionOrderDto } from './dto/create-subscription-order.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(AuthGuard)
  @Post('create-initial')
  async createInitial(@Req() req) {
    const userId = req.user.sub;
    return this.subscriptionService.createInitialSubscription(userId);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getActiveSubscription(@Req() req) {
    return this.subscriptionService.getActiveSubscription(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('change')
  async changeSubscription(@Req() req, @Body('planId') planId: string) {
    return this.subscriptionService.changeSubscription(req.user.sub, planId);
  }

  @Get('plans')
  async getPlans() {
    return this.subscriptionService.getPlans();
  }

  /* Ordenes */
  @UseGuards(AuthGuard)
  @Post('orders')
  async createOrder(@Req() req, @Body() body: CreateSubscriptionOrderDto) {
    return this.subscriptionService.createSubscriptionOrder(
      req.user.sub,
      body.planId,
    );
  }

  @UseGuards(AuthGuard)
  @Get('orders')
  async getOrders(@Req() req) {
    return this.subscriptionService.getUserOrders(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('orders/:id/pay')
  async createPaymentPreference(@Req() req, @Param('id') orderId: string) {
    return this.subscriptionService.createSubscriptionPayment(
      orderId,
      req.user.sub,
    );
  }
}
