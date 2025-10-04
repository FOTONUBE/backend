import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

import { Roles } from '../common/decorators/roles.decorator';
import { ValidRoles } from '../common/enums/roles.enum';
import { AdminUserService } from './admin.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AdminOrderService } from './adminOrder.service';
import { AdminAlbumService } from './adminAlbum.service';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
export class AdminUserController {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly adminOrderService: AdminOrderService,
    private readonly adminAlbumService: AdminAlbumService,
  ) {}

  @Get('/users')
  @Roles(ValidRoles.SUPER_ADMIN)
  async getAllUsers() {
    return this.adminUserService.findAll();
  }

  @Get('/stats')
  @Roles(ValidRoles.SUPER_ADMIN)
  async getAllStats() {
    const orders = await this.adminOrderService.getStats();
    const albums = await this.adminAlbumService.getStats();
    const users = await this.adminUserService.getStats();

    return { orders, albums, users };
  }

  @Get('photographers')
  @Roles(ValidRoles.SUPER_ADMIN)
  async getPhotographers() {
    return this.adminUserService.getAllPhotographers();
  }

  @Get('photographers/:id')
  @Roles(ValidRoles.SUPER_ADMIN)
  async getPhotographerById(@Param('id') id: string) {
    return this.adminUserService.getPhotographerById(id);
  }

  @Get('albums/:id')
  @Roles(ValidRoles.SUPER_ADMIN)
  async getAlbumById(@Param('id') id: string) {
    return this.adminUserService.getAlbumByIdForAdmin(id);
  }

  @Post('users/:id/activate')
  @Roles(ValidRoles.SUPER_ADMIN)
  async activateUser(@Param('id') id: string) {
    return this.adminUserService.setActiveStatus(id, true);
  }

  @Post('users/:id/deactivate')
  @Roles(ValidRoles.SUPER_ADMIN)
  async deactivateUser(@Param('id') id: string) {
    return this.adminUserService.setActiveStatus(id, false);
  }
}
