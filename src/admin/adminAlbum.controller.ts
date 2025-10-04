// adminAlbum.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AdminAlbumService } from './adminAlbum.service';

@Controller('admin/albums')
export class AdminAlbumController {
  constructor(private readonly adminAlbumService: AdminAlbumService) {}

  @Get('stats')
  async getAlbumStats() {
    return this.adminAlbumService.getStats();
  }
}
