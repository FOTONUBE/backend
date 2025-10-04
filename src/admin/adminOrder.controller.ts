import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ValidRoles } from '../common/enums/roles.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { AdminOrderService } from './adminOrder.service';

@Controller('admin/orders')
@UseGuards(AuthGuard, RolesGuard)
export class AdminOrderController {
  constructor(private readonly adminOrderService: AdminOrderService) {}

  @Get()
  @Roles(ValidRoles.SUPER_ADMIN)
  async getAllOrders(
    @Query('status') status?: string,
    @Query('photographerId') photographerId?: string,
    @Query('clientId') clientId?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.adminOrderService.findAll({
      status,
      photographerId,
      clientId,
      page,
      limit,
    });
  }

  @Get(':id')
  @Roles(ValidRoles.SUPER_ADMIN)
  async getOrderById(@Param('id') id: string) {
    return this.adminOrderService.findById(id);
  }

  @Get('stats/dashboard')
  @Roles(ValidRoles.SUPER_ADMIN)
  async getOrderStats() {
    return this.adminOrderService.getStats();
  }
}
